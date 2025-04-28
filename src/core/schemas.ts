import { string, object, boolean } from 'zod'

import {
	invalidContactNumberError,
	invalidPasswordError,
	invalidUsernameError,
	nonSimilarPasswordsError,
} from '@src/core/constants'

export const signinSchema = object({
	email: string().email(),
	password: string().min(8, invalidPasswordError),
})

export const signupSchema = object({
	email: string().email(),
	username: string().min(1, invalidUsernameError),
	contactNumber: string().regex(
		/^(0\d{10}|9\d{11})$/,
		invalidContactNumberError,
	),
	password: string().min(8, invalidPasswordError),
	confirmPassword: string().min(8, invalidPasswordError),
}).refine(data => data.password === data.confirmPassword, {
	message: nonSimilarPasswordsError,
	path: ['confirmPassword'],
})

export const createTaskSchema = object({
	name: string().min(1, 'Task name is required'),
	completed: boolean(),
})
