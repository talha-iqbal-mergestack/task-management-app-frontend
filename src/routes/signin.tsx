import { createFileRoute, redirect } from '@tanstack/react-router'

import { SigninForm } from '@features/auth/signin/components'

export const Route = createFileRoute('/signin')({
	component: Signin,
	beforeLoad: async ({ context }) => {
		const { isAuthenticated } = context.authentication
		if (isAuthenticated) {
			throw redirect({
				to: '/dashboard',
			})
		}
	},
})

function Signin() {
	return <SigninForm />
}
