import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useTasksForm } from '@features/dashboard/common/hooks'
import { InputField as CustomInputField } from '@features/common/components'
import { TaskFormValues } from '@features/dashboard/common/types'
import { useAuth } from '@features/auth/common/hooks'

const InputField = CustomInputField<TaskFormValues>

export function Tasks() {
	const {
		form,
		tasks,
		onSubmit,
		onDelete,
		editingId,
		setEditingId,
		updateTask,
	} = useTasksForm()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form
	const [editableText, setEditableText] = useState('')
	const {
		authState: { user },
		signout,
	} = useAuth()
	const navigate = useNavigate()

	const handleSignout = () => {
		signout()
		navigate({ to: '/signin' })
	}

	return (
		<div className="h-[calc(100vh)] flex flex-col w-full p-6 bg-gray-50">
			<div className="flex-1 flex flex-col min-h-0">
				{user && <div>{`Welcome ${user.email}`}</div>}
				<div className="flex-shrink-0 flex justify-between items-center">
					<h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
					<button
						onClick={handleSignout}
						className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Sign out
					</button>
				</div>

				<form
					className="mt-6 max-w-2xl flex-shrink-0"
					onSubmit={handleSubmit(onSubmit)}
				>
					{errors.root && (
						<div className="text-red-500 text-sm mb-4">
							{errors.root.message}
						</div>
					)}

					<div className="flex items-start gap-4">
						<div className="flex-1">
							<InputField
								type="text"
								name="name"
								placeholder="Enter task name"
								register={register}
								error={errors.name?.message}
								isFirst
								isLast
							/>
						</div>
						<button
							type="submit"
							className="h-[42px] px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Create Task
						</button>
					</div>
				</form>

				<div className="mt-6 flex-1 min-h-0 overflow-auto">
					{tasks.length === 0 ? (
						<p className="text-gray-500">
							No tasks created yet. Create your first task above!
						</p>
					) : (
						<ul className="h-full overflow-y-auto space-y-4 pr-2">
							{tasks.map(task => (
								<li
									key={task.id}
									className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
								>
									<div className="flex items-center gap-3 flex-1">
										<input
											type="checkbox"
											checked={task.completed}
											onChange={() =>
												updateTask(task.id, { completed: !task.completed })
											}
											className="h-4 w-4 text-indigo-600 rounded cursor-pointer"
										/>
										{editingId === task.id ? (
											<input
												type="text"
												value={editableText}
												onChange={e => setEditableText(e.target.value)}
												className="flex-1 p-1 border rounded-md"
												autoFocus
												onKeyDown={e => {
													if (e.key === 'Escape') {
														setEditingId(null)
													} else if (e.key === 'Enter') {
														updateTask(task.id, { name: editableText })
														setEditingId(null)
													}
												}}
											/>
										) : (
											<span
												className={
													task.completed ? 'line-through text-gray-500' : ''
												}
											>
												{task.name}
											</span>
										)}
									</div>
									<div className="flex gap-2">
										<button
											onClick={() => {
												if (editingId === task.id) {
													updateTask(task.id, { name: editableText })
													setEditingId(null)
												} else {
													setEditingId(task.id)
													setEditableText(task.name)
												}
											}}
											className="px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-md hover:bg-gray-100"
										>
											{editingId === task.id ? 'Save' : 'Edit'}
										</button>
										<button
											onClick={() => onDelete(task.id)}
											className="px-4 py-2 text-gray-600 hover:text-red-600 rounded-md hover:bg-gray-100"
										>
											Delete
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	)
}
