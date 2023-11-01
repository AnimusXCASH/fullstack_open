import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'

import axios from 'axios'

import './index.css'


import { getPersons, createEntry, deletePerson, updatePerson } from './service/apiCalls'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [userMessage, setUserMessage] = useState(null)

  useEffect(() => {
    getPersons().then(response => {
      setPersons(response.data)
    }).catch(error=>{
      console.log(`Getting data ERR: ${error}`)
    })
  
    return () => {
      
    }
  }, [userMessage])

  // Timer manager to remove console notification after certain amount of time
  const activateTimer = () => {
    setTimeout(()=> {
      setUserMessage(null)
    }, 5000)
  }
  

  // Function handling call to database to add/update person details in the phonebook
  const addPerson = (event) =>{
    event.preventDefault();

    // Both fields need to have content otherwise alert should be thrown
    if (newName.length > 0 && newNumber.length > 0) {

      let existingPerson = persons.find(person => person.name === newName)
      if (existingPerson){
        if (existingPerson.number !== newNumber){
          if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){

            let updatedPerson = {...existingPerson, number:newNumber}  // Creating updated person entry with new number
            updatePerson(existingPerson.id,updatedPerson).then(response=>{

              // Updating the state of the phonebook to updated the frontend as well 
              setPersons(prevPersons => 
                prevPersons.map(person => 
                  person.id !== existingPerson.id ? person : response.data
                )
              );

              setNewName(''); // Reset the input fields
              setNewNumber('');

              setUserMessage(`${newName} has been successfully updated with new number ${newNumber}`)
              activateTimer()

            }).catch(error =>{
              console.log(`Updating error: ${error}`)
            })
          }
        }else{
          alert(`${newName} with the same number is already stored in phonebook`)
        }
      }else{
        const newPersonObj = {
          name: newName,
          number: newNumber
        }
        createEntry(newPersonObj).then(response=>{
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          setUserMessage(`Added ${newName}`)
          activateTimer()
        }).catch(error=>{
          alert(`${error}`)
        })
      }
    }else{
      alert(`Name or number can not be empty`)
    }
  }

  const deletePersonHandler = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
        deletePerson(person.id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== person.id));
            })
            .catch(error => {
                console.error(`Error deleting person with id ${person.id}:`, error);
                setUserMessage(`Entry has been already removed from phonebook`)
                activateTimer();
                setPersons(persons.filter(p => p.id !== person.id));
            });
      }
  };


  const handleInputChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={userMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePersonHandler}/>
    </div>
  )
}

export default App