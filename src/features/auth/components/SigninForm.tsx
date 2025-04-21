import { Link } from '@tanstack/react-router'

import { useSigninForm } from '@features/auth/hooks'
import { FormInput } from '@shared/components'
import { SigninFormValues } from '@features/auth/types'

const SigninFormInput = FormInput<SigninFormValues>

export function SigninForm() {
	const { form, signinMutation, onSubmit } = useSigninForm()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{errors.root && (
						<div className="text-red-500 text-sm text-center">
							{errors.root.message}
						</div>
					)}
					<div className="rounded-md shadow-sm -space-y-px">
						<SigninFormInput
							type="email"
							name="email"
							placeholder="Email address"
							register={register}
							error={errors.email?.message}
							isFirst
						/>
						<SigninFormInput
							type="password"
							name="password"
							placeholder="Password"
							register={register}
							error={errors.password?.message}
							isLast
						/>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{signinMutation.isPending ? 'Signing in...' : 'Sign in'}
						</button>
					</div>

					<div className="text-sm text-center">
						<Link
							to="/signup"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Don't have an account? Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
