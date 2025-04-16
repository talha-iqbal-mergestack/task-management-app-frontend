import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@src/features/auth/components/RegisterForm'

export const Route = createFileRoute('/register')({
	component: Register,
})

function Register() {
	return <RegisterForm />
}
