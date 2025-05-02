import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useSigninForm } from '@features/auth/signin/hooks'
import { InputField as CustomInputField } from '@features/common/components/InputField'
import { PasswordInputField } from '@features/auth/signin/components/PasswordInputField'
import { SigninFormValues } from '@features/auth/signin/types'
import { useAuth } from '@features/auth/common/hooks'
import { FieldType } from '@src/core/enums'
import { toast } from '@features/common/lib'

const InputField = CustomInputField<SigninFormValues>

export function SigninForm() {
	const { form, onSubmit } = useSigninForm()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form
	const { authState } = useAuth()

	useEffect(() => {
		if (authState.error) {
			toast.error(authState.error)
		}
	}, [authState.error])

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="rounded-md shadow-sm -space-y-px">
						<InputField
							type={FieldType.email}
							name="email"
							placeholder="Email address"
							register={register}
							error={errors.email?.message}
							isFirst
						/>
						<PasswordInputField register={register} errors={errors} />
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{authState.loading ? 'Signing in...' : 'Sign in'}
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
