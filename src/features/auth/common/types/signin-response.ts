import { ApiResponse } from '@features/common/types'

export type SigninResponse = ApiResponse<{
	token: string
}>
