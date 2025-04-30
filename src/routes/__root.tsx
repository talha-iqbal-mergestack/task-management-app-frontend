import {
	createRootRouteWithContext,
	Outlet,
	redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AuthContext } from '@features/auth/common/hooks/useAuth'

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
		if (location.pathname === '/') {
			throw redirect({ to: '/signin' })
		}
	},
})
