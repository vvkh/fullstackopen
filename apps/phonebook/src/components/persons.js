const Person = ({ person, onDeleteClicked }) => (
  <li>
    <button onClick={() => onDeleteClicked(person.id)}>delete</button>
    {person.name} {person.number}
  </li>
)

export const Persons = ({ persons, searchValue, onSearchValueChange, onDeleteClicked }) => {
  const personsToShow = searchValue ? persons.filter(
    person => person.name.toLowerCase().includes(searchValue.toLowerCase())
  ) : persons

  return (<>
    filter shown with <input value={searchValue} onChange={onSearchValueChange} />
    <ul>
      {personsToShow.map(person => <Person key={person.name} person={person} onDeleteClicked={onDeleteClicked} />)}
    </ul>
  </>)
}

export const AddPersonForm = ({ onSubmit, newName, onNewNameChange, newPhone, onNewPhoneChange }) => (
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