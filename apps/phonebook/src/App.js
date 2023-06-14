import { useState, useEffect } from 'react'
import PersonsService from './services/persons'
import { AddPersonForm, Persons } from './components/Persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState(null)
  const [alertLevel, setAlertLevel] = useState('success')

  useEffect(() => {
    PersonsService.getAll().then(data => {
      setPersons(data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (!newName) {
      alert('Please enter a name')
      return
    }
    if (!newPhone) {
      alert('Please enter a phone number')
      return
    }

    const nameExists = persons.find(person => person.name === newName)
    if (nameExists && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatedPerson = { ...nameExists, number: newPhone }
      PersonsService.updateOne(nameExists.id, { ...nameExists, number: newPhone }).then(data => {
        setPersons(persons.map(person => person.id !== updatedPerson.id ? person : data))
        setNewName('')
        setNewPhone('')
        setMessage(`${updatedPerson.name} was updated successfully`)
        setAlertLevel('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setMessage(`${updatedPerson.name} was already deleted from the server`)
        setAlertLevel('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== updatedPerson.id))
      })
      return
    }

    const personObject = {
      name: newName,
      number: newPhone,
    }
    PersonsService.createOne(personObject).then(data => {
      setPersons([...persons, data])
      setNewName('')
      setNewPhone('')
      setMessage(`${personObject.name} was added successfully`)
      setAlertLevel('success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonsService.deleteOne(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`${person.name} was deleted successfully`)
        setAlertLevel('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} alertLevel={alertLevel} />
      <AddPersonForm
        onSubmit={addName}
        newName={newName}
        onNewNameChange={(event) => setNewName(event.target.value)}
        newPhone={newPhone}
        onNewPhoneChange={(event) => setNewPhone(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchValue={searchValue}
        onSearchValueChange={(event) => setSearchValue(event.target.value)}
        onDeleteClicked={deleteName}
      />
    </div>
  )
}

export default App
