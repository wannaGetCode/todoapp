export const FILTER_MODE = {
	All: () => true,
	Active: task => !task.completed,
	Completed: task => task.completed
}