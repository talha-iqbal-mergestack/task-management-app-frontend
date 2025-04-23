import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { TaskFormValues } from '@features/dashboard/common/types'
import { tasksApi } from '@features/dashboard/common/api'

const schema = z.object({
	name: z.string().min(1, 'Task name is required'),
	completed: z.boolean(),
})

export function useTasksForm() {
	const [editingId, setEditingId] = useState<string | null>(null)
	const queryClient = useQueryClient()

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			completed: false,
		},
	})

	const { data: tasks = [] } = useQuery({
		queryKey: ['tasks'],
		queryFn: tasksApi.getTasks,
	})

	const createTaskMutation = useMutation({
		mutationFn: tasksApi.createTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
			alert('Task created successfully')
		},
		onError: error => {
			form.setError('root', {
				message: error.message || 'An error occurred while creating a task',
			})
		},
	})

	const deleteTaskMutation = useMutation({
		mutationFn: tasksApi.deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
	})

	const updateTaskMutation = useMutation({
		mutationFn: tasksApi.updateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] })
		},
	})

	const onSubmit = (values: TaskFormValues) => {
		createTaskMutation.mutate(values)
		form.reset()
	}

	const onDelete = (id: string) => {
		deleteTaskMutation.mutate(id)
		if (editingId === id) {
			setEditingId(null)
			form.reset()
		}
	}

	const updateTask = (id: string, updates: Partial<TaskFormValues>) => {
		const task = tasks.find(t => t.id === id)
		if (task) {
			updateTaskMutation.mutate({ ...task, ...updates })
		}
	}

	return {
		form,
		tasks,
		onSubmit,
		onDelete,
		editingId,
		setEditingId,
		updateTask,
	}
}
