import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@features/auth/components'

export const Route = createFileRoute('/login')({
	component: Login,
})

function Login() {
	return <LoginForm />
}
