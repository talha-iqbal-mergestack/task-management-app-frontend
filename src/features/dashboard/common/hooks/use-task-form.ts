import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from '@features/common/lib'

import { TaskFormValues } from '@features/dashboard/common/types'
import { tasksApi } from '@features/dashboard/common/api'
import { createTaskSchema } from '@src/core/schemas'

export function useTasksForm() {
	const [editingId, setEditingId] = useState<string | null>(null)
	const queryClient = useQueryClient()

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			name: '',
			completed: false,
		},
	})

	const { data: tasks = [] } = useQuery({
		queryKey: ['tasks'],
		queryFn: tasksApi.getTasks,
		select: data => data.body,
	})

	const createTaskMutation = useMutation({
		mutationFn: tasksApi.createTask,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] })
			form.reset()
			toast.success('Task created successfully')
		},
		onError: error => {
			toast.error(error.message || 'An error occurred while creating a task')
		},
	})

	const deleteTaskMutation = useMutation({
		mutationFn: tasksApi.deleteTask,
		onSuccess: async (_, variables) => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] })
			toast.success('Task deleted')
			if (editingId === variables) {
				setEditingId(null)
			}
		},
		onError: error => {
			toast.error(error.message || 'Failed to delete task')
		},
	})

	const updateTaskMutation = useMutation({
		mutationFn: tasksApi.updateTask,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] })
			setEditingId(null)
			toast.success('Task updated successfully')
		},
		onError: error => {
			toast.error(error.message || 'Failed to update task')
		},
	})

	const onSubmit = (values: TaskFormValues) => {
		createTaskMutation.mutate(values)
	}

	const onDelete = (id: string) => {
		deleteTaskMutation.mutate(id)
	}

	const updateTask = (id: string, updates: Partial<TaskFormValues>) => {
		const task = tasks.find(t => t.id === id)
		if (task) {
			updateTaskMutation.mutate({
				...task,
				...updates,
				...{
					createdAt: undefined,
					updatedAt: undefined,
				},
			})
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
		createTaskMutation,
		updateTaskMutation,
		deleteTaskMutation,
	}
}
