import { useState } from 'react'
import './App.scss'
import Todo from './components/Todo'
import Heading from './components/Heading'
import FilterButton from './components/FilterButton'
import ToastMessage from './components/ToastMessage'
import { FILTER_MODE } from './components/actions'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [toasts, setToasts] = useState([])
  const listTodo = tasks
    .filter(FILTER_MODE[filter])
    .map((task, index) => 
      <Todo
        task={task.name}
        index={task.id}
        key={task.id}
        completed={task.completed}
        removeTask={removeTask}
        editTask={editTask}
        toggleCompleteTask={toggleCompleteTask}
      />
    )

  const taskRemain = listTodo.length + ` ${listTodo.length > 1 ? 'tasks' : 'task'} remaining`
  const filterMode = Object.keys(FILTER_MODE)
  const filterButton = filterMode.map(item =>
    <FilterButton key={item} mode={item} setFilter={setFilter}/>
  )

  function addTask(name) {
    const newTask = {
      name,
      completed: false,
      id: tasks.length
    }
    setTasks(task => [...task, newTask])
  }

  function removeTask(index, task) {
    handleDeleteToast(task)
    setTasks(tasks.filter(task => task.id !== index))
  }

  function editTask(index, newTask) {
    setTasks(tasks.map((task, i) => {
      if (i === index) { task.name = newTask}
      return task
    }))
    handleSuccessToast(newTask)
  }

  function toggleCompleteTask(index) {
    setTasks(tasks.map((task, i) => {
      if (i === index) { task.completed = !task.completed}
      return task
    }))
  }

  function handleSuccessToast(newTask) {
    setToasts(toast => {
      const newToast = {
        id: toast.length,
        type: 'success',
        title: `Edit to ${newTask} successfully`
      }
      return [...toast, newToast]
    })
  }

  function handleDeleteToast(name) {
    setToasts(toast => {
      const newToast = {
        id: toast.length,
        type: 'error',
        title: `Delete ${name} successfully`
      }
      return [...toast, newToast]
    })
  }

  function removeToast(index) {
    setToasts(toasts.filter(toast => toast.id !== index))
  }

  return (
    <div className="todoapp">
      <Heading addTask={addTask}/>

      <div className="todoapp-body">
        <div className="filter-button">
          {filterButton}
        </div>

        <h2 id="list-heading">
          {taskRemain}
        </h2>

        <ul className="todo-list">
          {listTodo}
        </ul>
      </div>

      <div id="toast">
        {toasts.map(toast => <ToastMessage toast={toast} removeToast={removeToast} key={toast.id}/>)}
      </div>
    </div>
  );
}

export default App;
