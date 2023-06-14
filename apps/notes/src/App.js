import { useState, useEffect } from 'react'
import Note from './components/Note'
import ErrorMessage from './components/ErrorMessage'
import Footer from './components/Footer'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(data => {
        setNotes(data)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: false,
      id: notes.length + 1,
    }

    noteService.create(noteObject)
      .then(data => {
        setNotes([...notes, data])
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = (noteId) => {
    const note = notes.find(note => note.id === noteId)
    const updatedNote = { ...note, important: !note.important }

    noteService.update(note.id, updatedNote)
      .then(data => {
        setNotes(notes.map(note => note.id !== updatedNote.id ? note : data))
      }).catch(error => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== note.id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <ErrorMessage message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )

}

export default App;
