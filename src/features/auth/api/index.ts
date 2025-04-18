import { apiClient } from '@lib/api'
import {
	AuthResponse,
	SigninCredentials,
	SignupCredentials,
} from '@features/auth/types'

export const authApi = {
	signin: (credentials: SigninCredentials) =>
		apiClient<AuthResponse>('/auth/signin', {
			method: 'POST',
			data: credentials,
		}),

	signup: (credentials: SignupCredentials) =>
		apiClient<AuthResponse>('/auth/signup', {
			method: 'POST',
			data: credentials,
		}),
}
