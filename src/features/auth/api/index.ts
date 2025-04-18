import { apiClient } from '@lib/api'
import {
	SigninCredentials,
	SigninResponse,
	SignupCredentials,
	SignupResponse,
} from '@features/auth/types'

export const authApi = {
	signin: (credentials: SigninCredentials) =>
		apiClient<SigninResponse>('/auth/signin', {
			method: 'POST',
			data: credentials,
		}),

	signup: (credentials: SignupCredentials) =>
		apiClient<SignupResponse>('/auth/signup', {
			method: 'POST',
			data: credentials,
		}),
}
