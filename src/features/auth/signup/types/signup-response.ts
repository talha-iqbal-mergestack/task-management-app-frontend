import { ApiResponse } from '@constants/types'

export type SignupResponse = ApiResponse<{
	email: string
	createdAt: string
	updatedAt: string
	id: string
}>
