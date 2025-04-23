import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AuthContext } from '@features/auth/hooks/useAuth'

type RouterContext = {
	authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
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
