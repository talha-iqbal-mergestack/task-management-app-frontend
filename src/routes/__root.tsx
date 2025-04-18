import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
	beforeLoad: ({ location }) => {
		// Redirect to login if we're at the root URL
		if (location.pathname === '/') {
			throw redirect({ to: '/signin' })
		}
	},
})
