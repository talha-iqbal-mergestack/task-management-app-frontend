export type ApiResponse<T = Record<string, string>> = {
	status: string
	message: string
	body: T
}
