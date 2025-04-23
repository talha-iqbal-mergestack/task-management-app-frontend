import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import { authApi } from '@features/auth/api'
import { SigninFormValues } from '@features/auth/signin/types'
import { useAuth } from '@features/auth/hooks'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export function useSigninForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { signin } = useAuth()
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
			signin(data)
			navigate({ to: '/dashboard' })
		},
		onError: error => {
			form.setError('root', {
				message: error.message || 'An error occurred during signin',
			})
		},
	})

	const onSubmit: SubmitHandler<SigninFormValues> = data => {
		// signinMutation.mutate(data)
		dispatch({ type: 'auth/signin', payload: data })
	}

	return {
		form,
		signinMutation,
		onSubmit,
	}
}
