import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from '../services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success')



  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)

      if(confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber}
      
        personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Updated ${returnedPerson.name}'s number`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
          
        })
        .catch(() => {
          setNotificationMessage(`Information of '${existingPerson.name}' has already been removed from server.`)
          setNotificationType('error')
          setPersons(persons.filter(p => p.id !== existingPerson.id))
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      // id: String(persons.length + 1)
    }
    personService
    .create(personObject)
      .then(returnedPerson => {
        console.log('promise fulfilled')
        setPersons(persons.concat(returnedPerson))
        setNewName('')
    setNewNumber('')
    setNotificationMessage(`Added ${personObject.name} `)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
      })
    
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleDelete = id => {
    const person = persons.find(p=>p.id === id)
    if(window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`The person '${person.name}' was already deleted from the server.`, error)
        setPersons(persons.filter(p => p.id !== id))
      })
      
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default App