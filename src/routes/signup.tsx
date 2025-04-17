import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '@features/auth/components'

export const Route = createFileRoute('/signup')({
	component: Signup,
})

function Signup() {
	return <SignupForm />
}
