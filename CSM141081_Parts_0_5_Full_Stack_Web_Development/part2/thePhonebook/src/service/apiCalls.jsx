import axios from "axios";
const DEV_API = 'http://localhost:3001/persons'


export const getPersons = () =>{
    return axios.get(DEV_API)
}

export const createEntry = newPerson =>{
    return axios.post(DEV_API, newPerson)
}

export const updatePerson = (id, updatedPerson) =>{
    return axios.put(`${DEV_API}/${id}`, updatedPerson)
}

export const deletePerson = (id) => {
    return axios.delete(`${DEV_API}/${id}`);
}

// export default {
//     getAll: getPersons,
//     create: createEntry,
//     update: updatePerson
// }