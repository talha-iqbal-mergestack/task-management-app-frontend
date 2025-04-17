import { Link } from '@tanstack/react-router'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

type FormInput = {
	email: string
	password: string
}

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<IFormInput> = data => {
		console.log(data)
	}

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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								{...register('password')}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs italic">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign in
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
