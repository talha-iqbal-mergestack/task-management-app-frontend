import { createFileRoute } from '@tanstack/react-router'
import { SigninForm } from '@features/auth/signin/components'

export const Route = createFileRoute('/signin')({
	component: Login,
})

function Login() {
	return <SigninForm />
}
