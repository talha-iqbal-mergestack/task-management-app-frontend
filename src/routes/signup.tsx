import { createFileRoute, redirect } from '@tanstack/react-router'

import { SignupForm } from '@features/auth/signup/components'

export const Route = createFileRoute('/signup')({
	component: Signup,
	beforeLoad: async ({ context }) => {
		const {
			authState: { isAuthenticated },
		} = context.authentication
		if (isAuthenticated) {
			throw redirect({
				to: '/signin',
			})
		}
	},
})

function Signup() {
	return <SignupForm />
}
