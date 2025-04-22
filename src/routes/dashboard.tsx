import { createFileRoute, redirect } from '@tanstack/react-router'

import { Tasks } from '@features/dashboard/components'

export const Route = createFileRoute('/dashboard')({
	component: Dashboard,
	beforeLoad: async () => {
		if (!localStorage.getItem('token')) {
			throw redirect({
				to: '/signin',
			})
		}
	},
})

function Dashboard() {
	return <Tasks />
}
