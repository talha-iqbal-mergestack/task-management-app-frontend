import { Link, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { authApi } from '@features/auth/api'

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

export function SignupForm() {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
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
			localStorage.setItem('token', data.token)
			navigate({ to: '/login' })
		},
		onError: error => {
			setError('root', {
				message: error.message || 'An error occurred during login',
			})
		},
	})

	const onSubmit: SubmitHandler<FormInput> = data => {
		const { email, confirmPassword: password } = data
		signupMutation.mutate({ email, password })
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">
						Create your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{errors.root && (
						<div className="text-red-500 text-sm text-center">
							{errors.root.message}
						</div>
					)}
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<input
								type="email"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								{...register('email')}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs italic">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<input
								type="password"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								{...register('password')}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs italic">
									{errors.password.message}
								</p>
							)}
						</div>
						<div>
							<input
								type="password"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Confirm password"
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-xs italic">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{signupMutation.isPending ? 'Signing up...' : 'Sign up'}
						</button>
					</div>

					<div className="text-sm text-center">
						<Link
							to="/login"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Already have an account? Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
