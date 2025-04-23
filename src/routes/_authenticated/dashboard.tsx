import { createFileRoute } from '@tanstack/react-router'

import { Tasks } from '@features/dashboard/components'

export const Route = createFileRoute('/_authenticated/dashboard')({
	component: Dashboard,
})

function Dashboard() {
	return <Tasks />
}
