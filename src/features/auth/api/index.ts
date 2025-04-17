import { apiClient } from '@lib/api'
import {
	AuthResponse,
	LoginCredentials,
	SignupCredentials,
} from '@features/auth/types'

export const authApi = {
	login: (credentials: LoginCredentials) =>
		apiClient<AuthResponse>('/auth/login', {
			method: 'POST',
			data: credentials,
		}),

	signup: (credentials: SignupCredentials) =>
		apiClient<AuthResponse>('/auth/signup', {
			method: 'POST',
			data: credentials,
		}),
}
