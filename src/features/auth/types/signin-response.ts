import { ApiResponse } from '@shared/types'

export type SigninResponse = ApiResponse<{
	token: string
}>
