import { useState, useRef, useEffect } from 'react'
import { nanoid } from "nanoid"

import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import usePrevious from './components/usePrevious'

const FILTER_MAP = {
	All: () => true,
	Active: task => !task.completed,
	completed: task => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

function App(props) {
	const [tasks, setTasks] = useState(props.tasks)
	const [filter, setFilter] = useState('All')
	const listHeadingRef = useRef()

	const prevTaskLength = usePrevious(tasks.length)

	const taskList = tasks
	.filter(FILTER_MAP[filter])
	.map(task => (
		<Todo
			id={task.id}
			name={task.name}
			completed={task.completed}
			key={task.id}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
		/>
	));
	const headingText = taskList.length + ' ' + (taskList.length > 1 ? 'tasks' : 'task') + ' remaining'


	function addTask(name) {
		const newTask = { id: "todo-" + nanoid(), name, completed: false}
		setTasks([...tasks, newTask])
	}

	function toggleTaskCompleted(id) {
		const updateTasks = tasks.map(task => {
			if (id === task.id) {
				// use object spread to make a new object
				// whose `completed` props has been inverted
				return {...task, completed: !task.completed}
			}
			return task
		})
		setTasks(updateTasks)
	}

	function deleteTask(id) {
		setTasks(tasks.filter(task => id !== task.id))
	}

	function editTask(id, newName) {
		const editedTaskList = tasks.map(task => {
			// if this task has the same ID as the edited task
			if (id === task.id) {
				return {...task, name: newName}
			}
			return task
		})
		setTasks(editedTaskList)
	}

	useEffect(() => {
		if (tasks.length - prevTaskLength === -1) {
			listHeadingRef.current.focus()
		}
	}, [tasks.length, prevTaskLength])

	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<Form addTask={addTask}/>
			<div className="fillters btn-group stack-exception">
				{FILTER_NAMES.map(name => (
					<FilterButton
						key={name}
						name={name}
						isPressed={name === filter}
						setFilter={setFilter}
					/>
				))}
			</div>
			<h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
				{headingText}
			</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{taskList}
			</ul>
		</div>
	);
}

export default App;
