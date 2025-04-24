import { string, object } from 'zod'

import { invalidPasswordError } from '@src/common/constants'

export const signinSchema = object({
	email: string().email(),
	password: string().min(8, invalidPasswordError),
})

export const signupSchema = object({
	email: string().email(),
	password: string().min(8, invalidPasswordError),
	confirmPassword: string().min(8, invalidPasswordError),
}).refine(data => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ['confirmPassword'],
})
