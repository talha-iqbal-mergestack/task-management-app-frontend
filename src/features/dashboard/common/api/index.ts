import { apiClient } from '@lib/api'
import { Task, TaskFormValues } from '@features/dashboard/common/types'
import { ApiResponse } from '@features/common/types'

export const tasksApi = {
	createTask: (task: TaskFormValues) =>
		apiClient<TaskFormValues>('/tasks', {
			method: 'POST',
			data: task,
		}),
	getTasks: () =>
		apiClient<ApiResponse<Task[]>>('/tasks', {
			method: 'GET',
		}),
	updateTask: (task: Task) =>
		apiClient<ApiResponse<Task>>(`/tasks/${task.id}`, {
			method: 'PATCH',
			data: { ...task, id: undefined },
		}),
	deleteTask: (id: string) =>
		apiClient<void>(`/tasks/${id}`, {
			method: 'DELETE',
		}),
}

// import { Task, TaskFormValues } from '@features/dashboard/common/types'

// Mock data store
// let mockTasks: Task[] = [
// 	{
// 		id: '1',
// 		name: 'Learn React',
// 		completed: false,
// 	},
// 	{
// 		id: '2',
// 		name: 'Build a task app',
// 		completed: true,
// 	},
// ]

// Helper to simulate API delay
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// export const tasksApi = {
// 	createTask: async (task: TaskFormValues) => {
// 		await delay(500) // Simulate network delay
// 		const newTask: Task = {
// 			...task,
// 			id: Math.random().toString(36).substring(7), // Generate random ID
// 		}
// 		mockTasks = [...mockTasks, newTask]
// 		return newTask
// 	},

// 	getTasks: async () => {
// 		await delay(500)
// 		return mockTasks
// 	},

// 	updateTask: async (task: Task) => {
// 		await delay(500)
// 		mockTasks = mockTasks.map(t => (t.id === task.id ? task : t))
// 		return task
// 	},

// 	deleteTask: async (id: string) => {
// 		await delay(500)
// 		mockTasks = mockTasks.filter(t => t.id !== id)
// 	},
// }
