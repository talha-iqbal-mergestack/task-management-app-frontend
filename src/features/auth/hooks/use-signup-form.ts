import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

import { authApi } from '@features/auth/api'
import { setCredentials } from '@features/auth/auth-slice'

const schema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

type FormInput = {
	email: string
	password: string
	confirmPassword: string
}

export function useSignupForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const form = useForm<FormInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const signupMutation = useMutation({
		mutationFn: authApi.signup,
		onSuccess: data => {
			dispatch(setCredentials({ user: data.body }))
			navigate({ to: '/signin' })
		},
		onError: error => {
			form.setError('root', {
				message: error.message || 'An error occurred during signup',
			})
		},
	})

	const onSubmit: SubmitHandler<FormInput> = data => {
		const { email, confirmPassword: password } = data
		signupMutation.mutate({ email, password })
	}

	return {
		form,
		signupMutation,
		onSubmit,
	}
}
