import { apiClient } from '@lib'
import {
	SigninCredentials,
	SigninResponse,
	SignupCredentials,
	SignupResponse,
} from '@features/auth/common/types'

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
