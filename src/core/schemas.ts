import { string, object, boolean } from 'zod'

import {
	INVALID_CONTACT_NUMBER_ERROR,
	INVALID_PASSWORD_ERROR,
	INVALID_USERNAME_ERROR,
	MISSING_TASK_NAME_ERROR,
	NON_SIMILAR_PASSWORDS_ERROR,
} from '@src/core/constants'

export const signinSchema = object({
	email: string().email(),
	password: string().min(8, INVALID_PASSWORD_ERROR),
})

export const signupSchema = object({
	email: string().email(),
	username: string().min(1, INVALID_USERNAME_ERROR),
	contactNumber: string().regex(
		/^(0\d{10}|9\d{11})$/,
		INVALID_CONTACT_NUMBER_ERROR,
	),
	password: string().min(8, INVALID_PASSWORD_ERROR),
	confirmPassword: string().min(8, INVALID_PASSWORD_ERROR),
}).refine(data => data.password === data.confirmPassword, {
	message: NON_SIMILAR_PASSWORDS_ERROR,
	path: ['confirmPassword'],
})

export const createTaskSchema = object({
	name: string().min(1, MISSING_TASK_NAME_ERROR),
	completed: boolean(),
})
