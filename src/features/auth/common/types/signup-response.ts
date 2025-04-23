import { ApiResponse } from '@features/common/types'

export type SignupResponse = ApiResponse<{
	email: string
	createdAt: string
	updatedAt: string
	id: string
}>
