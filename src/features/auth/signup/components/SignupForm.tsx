import { Link } from '@tanstack/react-router'

import { useSignupForm } from '@features/auth/signup/hooks'
import { SignupFormValues } from '@features/auth/signup/types'
import { InputField as CustomInputField } from '@features/common/components'
import { useAuth } from '@features/auth/common/hooks'
import { FieldType } from '@features/common/enums'

const InputField = CustomInputField<SignupFormValues>

export function SignupForm() {
	const {
		form,
		// signupMutation,
		onSubmit,
	} = useSignupForm()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form
	const { authState } = useAuth()

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">
						Create your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{/* {errors.root && (
						<div className="text-red-500 text-sm text-center">
							{errors.root.message}
						</div>
					)} */}
					{authState.error && (
						<div className="text-red-500 text-sm text-center">{`${authState.error}`}</div>
					)}
					<div className="rounded-md shadow-sm -space-y-px">
						<InputField
							type={FieldType.email}
							name="email"
							placeholder="Email address"
							register={register}
							error={errors.email?.message}
							isFirst
						/>
						<InputField
							type={FieldType.text}
							name="username"
							placeholder="Username"
							register={register}
							error={errors.username?.message}
						/>
						<InputField
							type={FieldType.tel}
							name="contactNumber"
							placeholder="Contact Number"
							register={register}
							error={errors.contactNumber?.message}
						/>
						<InputField
							type={FieldType.password}
							name="password"
							placeholder="Password"
							register={register}
							error={errors.password?.message}
						/>
						<InputField
							type={FieldType.password}
							name="confirmPassword"
							placeholder="Confirm password"
							register={register}
							error={errors.confirmPassword?.message}
							isLast
						/>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{/* {signupMutation.isPending ? 'Signing up...' : 'Sign up'} */}
							{authState.loading ? 'Signing up...' : 'Sign up'}
						</button>
					</div>

					<div className="text-sm text-center">
						<Link
							to="/signin"
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
