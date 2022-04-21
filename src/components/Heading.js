import { useState } from 'react'

function Heading({ addTask }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim()) {
      addTask(name)
      setName('')
    }
  }

  function handleChange(e) {
    setName(e.target.value)
  }

  return (
    <div className="todoapp-heading">
      <h1>Todo List App</h1>
      <form onSubmit={handleSubmit}>
        <h2>
          <label htmlFor="new-input">
            What needs to be done?
          </label>
        </h2>
        <div className="todo-input">
          <input
            type="text"
            id="new-input"
            name="text"
            value={name}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn--add">Add</button>
        </div>
      </form>
    </div>
  )
}

export default Heading