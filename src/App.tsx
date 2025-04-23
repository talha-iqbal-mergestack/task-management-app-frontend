import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from '@src/routeTree.gen'
import { useAuth } from '@features/auth/common/hooks'

const router = createRouter({
	routeTree,
	context: { authentication: undefined! },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function App() {
	const authentication = useAuth()
	return <RouterProvider router={router} context={{ authentication }} />
}
