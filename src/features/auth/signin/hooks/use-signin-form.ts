import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

import { authApi } from '@features/auth/common/api'
import { SigninFormValues } from '@features/auth/signin/types'
import { useAuth } from '@features/auth/common/hooks'
import { signinSchema } from '@src/core/schemas'

export function useSigninForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		signin,
		authState: { user },
	} = useAuth()
	const form = useForm({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: user?.email || '',
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
		dispatch({ type: 'auth/signin', payload: data })
	}

	return {
		form,
		signinMutation,
		onSubmit,
	}
}
