import { string, object } from 'zod'

import {
	invalidContactNumberError,
	invalidPasswordError,
	invalidUsernameError,
	nonSimilarPasswordsError,
} from '@src/common/constants'

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
