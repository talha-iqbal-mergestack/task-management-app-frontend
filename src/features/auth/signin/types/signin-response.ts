import { ApiResponse } from '@constants/types'

export type SigninResponse = ApiResponse<{
	token: string
}>
