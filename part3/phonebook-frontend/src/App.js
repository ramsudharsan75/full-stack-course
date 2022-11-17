import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [personFilter, setPersonFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAllPersons().then((persons) => setPersons(persons));
  }, []);

  const personFilterHandler = (event) => setPersonFilter(event.target.value);
  const newNameHandler = (event) => setNewName(event.target.value);
  const newPhoneHandler = (event) => setNewPhone(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // eslint-disable-next-line no-restricted-globals
      const choice = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (choice) {
        const updatedPerson = { ...existingPerson, number: newPhone };
        personService
          .updateNumber(updatedPerson)
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? updatedPerson : person
              )
            );
            setNotification("Updated number of " + newName);
            setTimeout(() => setNotification(null), 3000);
            setNewName("");
            setNewPhone("");
          })
          .catch((err) => {
            setNotification(err.response.data.error);
            setIsError(true);
            setTimeout(() => {
              setNotification(null);
              setIsError(false);
            }, 3000);
          });
      } else {
        setNewName("");
        setNewPhone("");
      }
    } else {
      const newPerson = { name: newName, number: newPhone };
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNotification("Added " + newName);
          setTimeout(() => setNotification(null), 3000);
          setNewName("");
          setNewPhone("");
        })
        .catch((err) => {
          console.log(err);
          setNotification(err.response.data.error);
          setIsError(true);
          setTimeout(() => {
            setNotification(null);
            setIsError(false);
          }, 3000);
        });
    }
  };

  const deletePerson = (id, name) => {
    // eslint-disable-next-line no-restricted-globals
    const consent = confirm("Delete " + name + "?");

    if (consent) {
      personService
        .deletePerson(id)
        .then((res) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} isError={isError} />
      <Filter
        personFilter={personFilter}
        personFilterHandler={personFilterHandler}
      />
      <h3>Add a new person</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newNameHandler={newNameHandler}
        newName={newName}
        newPhone={newPhone}
        newPhoneHandler={newPhoneHandler}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        personFilter={personFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
