import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import { authApi } from '@features/auth/api'
import { setCredentials } from '@features/auth/auth-slice'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

type FormInput = {
	email: string
	password: string
}

export function useSigninForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const signinMutation = useMutation({
		mutationFn: authApi.signin,
		onSuccess: data => {
			localStorage.setItem('token', data.body.token)
			dispatch(setCredentials({ token: data.body.token }))
			navigate({ to: '/dashboard' })
		},
		onError: error => {
			form.setError('root', {
				message: error.message || 'An error occurred during signin',
			})
		},
	})

	const onSubmit: SubmitHandler<FormInput> = data => {
		signinMutation.mutate(data)
	}

	return {
		form,
		signinMutation,
		onSubmit,
	}
}
