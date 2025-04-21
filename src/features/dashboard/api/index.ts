import { apiClient } from '@lib/api'
import { Task } from '@features/dashboard/types'

export const tasksApi = {
	createTask: (task: Task) =>
		apiClient<Task>('/tasks', {
			method: 'POST',
			data: task,
		}),
	getTasks: () =>
		apiClient<Task[]>('/tasks', {
			method: 'GET',
		}),
	updateTask: (task: Task) =>
		apiClient<Task>(`/tasks/${task.id}`, {
			method: 'PUT',
			data: task,
		}),
	deleteTask: (id: string) =>
		apiClient<void>(`/tasks/${id}`, {
			method: 'DELETE',
		}),
}
