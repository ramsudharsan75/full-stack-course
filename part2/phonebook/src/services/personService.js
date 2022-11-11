import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const personService = {
    getAllPersons() {
        return axios
            .get(baseUrl)
            .then(res => res.data);
    },

    addNewPerson(newPerson) {
        return axios.post(baseUrl, newPerson)
            .then(res => res.data);
    },

    deletePerson(id) {
        return axios.delete(baseUrl + '/' + id);
    },

    updateNumber(updatedPerson) {
        return axios.put(baseUrl + '/' + updatedPerson.id, updatedPerson)
            .then(res => res.data);
    }
};

export default personService;