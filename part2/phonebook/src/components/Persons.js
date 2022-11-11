const Persons = ({ persons, personFilter, deletePerson }) =>
    <ul>
        {persons.map(({ id, name, number }) => {
            if (personFilter.length === 0)
                return <li key={id}>
                    {name} {number} <button onClick={() => deletePerson(id, name)} >delete</button>
                </li>;
            else if (name.toLowerCase().includes(personFilter.toLowerCase()))
                return <li key={id}>
                    {name} {number}
                    <button onClick={() => deletePerson(id, name)} >delete</button>
                </li>;
            return null;
        })}
    </ul>;

export default Persons;