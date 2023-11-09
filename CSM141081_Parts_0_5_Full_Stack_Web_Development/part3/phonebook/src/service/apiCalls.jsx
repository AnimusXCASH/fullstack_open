import axios from "axios";
// const DEV_API = 'http://localhost:3001'
const base_url = '/api/persons/'

export const getPersons = () =>{
    // let url = DEV_API+PERSONS
    return axios.get(base_url)
}

export const getPerson = (id)=>{
    let url = base_url + id
    return axios.get(url, id)
}
export const createEntry = newPerson =>{
    return axios.post(base_url, newPerson)
}

export const updatePerson = (id, updatedPerson) =>{
    let url = base_url + id
    return axios.put(url, updatedPerson)
}

export const deletePerson = (person) => {
    const personId = person.id
    let url = base_url + personId
    console.log(url)
    return axios.delete(url);
}
