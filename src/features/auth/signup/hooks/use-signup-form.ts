import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'

import { authApi } from '@features/auth/common/api'
import { SignupFormValues } from '@features/auth/signup/types'
import { useAuth } from '@features/auth/common/hooks'
import { signupSchema } from '@features/auth/common/schemas'

export function useSignupForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { signup } = useAuth()

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const signupMutation = useMutation({
		mutationFn: authApi.signup,
		onSuccess: data => {
			signup(data)
			navigate({ to: '/signin' })
		},
		onError: error => {
			form.setError('root', {
				message: error.message || 'An error occurred during signup',
			})
		},
	})

	const onSubmit: SubmitHandler<SignupFormValues> = data => {
		const { email, confirmPassword: password } = data
		// signupMutation.mutate({ email, password })
		dispatch({ type: 'auth/signup', payload: { email, password } })
	}

	return {
		form,
		signupMutation,
		onSubmit,
	}
}
