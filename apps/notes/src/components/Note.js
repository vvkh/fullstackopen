const Note = ({ note, toggleImportance }) => {
    const importanceToggleLabel = note.important ? 'make not important' : 'make important'
    return (
        <li>
            {note.content} <button onClick={toggleImportance}>{importanceToggleLabel}</button>
        </li>
    )
}

export default Note;