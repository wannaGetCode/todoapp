import { useState, useRef, useEffect } from 'react'

function Todo({ task, index, completed, toggleCompleteTask, removeTask, editTask }) {
  const [editing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const editFieldRef = useRef()

  function editNewName() {
    if (newName === "") {
      removeTask(index, task)
    } else {
      editTask(index, newName)
    }
    setEditing(false)
    setNewName('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      editNewName()
    }
  }

  useEffect(() => {
    if (editing) {
      editFieldRef.current.focus()
    }
  }, [editing])

  const editTemplate = (
    <>
      <div className="todo-list__edit">     
        <label className="todo-list__label" htmlFor={index}>
          Edit new name for <strong>{task}</strong>
        </label>
        <input
          id={index}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
          // onBlur={() => setEditing(false)}   
          ref={editFieldRef}
        />
      </div>
      <div className="todo-list__btn">
        <button
          type="button"
          className="btn"
          onClick={editNewName}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </div>
    </>
  )

  const viewTemplate = (
    <>
      <div className="todo-list__check">
      <input
        id={index}
        type="checkbox"
        defaultChecked={completed}
        onChange={() => toggleCompleteTask(index)}
      />
      <label
        className="todo-list__label"
        htmlFor={index}
      >
        {task}
      </label>
    </div>
    <div className="todo-list__btn">
      <button
        type="button"
        className="btn"
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn--danger"
        onClick={() => removeTask(index, task)}
      >
        Delete
      </button>
    </div>
    </>
  )

	return (
		<li className="todo-list__item">
      {editing ? editTemplate : viewTemplate}
    </li>
	)
}

export default Todo