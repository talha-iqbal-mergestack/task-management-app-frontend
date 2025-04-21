import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Task, TaskFormValues } from '@features/dashboard/types'

const schema = z.object({
	name: z.string().min(1, 'Task name is required'),
	completed: z.boolean(),
})

export function useTasksForm() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [editingId, setEditingId] = useState<string | null>(null)

	const form = useForm<TaskFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			completed: false,
		},
	})

	const onSubmit = (values: TaskFormValues) => {
		const newTask: Task = {
			id: Date.now().toString(),
			name: values.name,
			completed: false,
		}

		setTasks(currentTasks => [...currentTasks, newTask])
		form.reset()
	}

	const onDelete = (id: string) => {
		setTasks(tasks.filter(task => task.id !== id))
		if (editingId === id) {
			setEditingId(null)
			form.reset()
		}
	}

	const updateTask = (id: string, updates: Partial<Task>) => {
		setTasks(
			tasks.map(task => (task.id === id ? { ...task, ...updates } : task)),
		)
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
