import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
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
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newPhone,
    }
    setPersons([...persons, personObject])
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  )
}

export default App


const Person = ({ person }) => (
  <li>{person.name} {person.number}</li>
)

const Persons = ({ persons, searchValue, onSearchValueChange }) => {
  const personsToShow = searchValue ? persons.filter(
    person => person.name.toLowerCase().includes(searchValue.toLowerCase())
  ) : persons

  return (<>
    filter shown with <input value={searchValue} onChange={onSearchValueChange} />
    <ul>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </ul>
  </>)
}

const AddPersonForm = ({ onSubmit, newName, onNewNameChange, newPhone, onNewPhoneChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNewNameChange} />
    </div>
    <div>
      phone: <input value={newPhone} onChange={onNewPhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)