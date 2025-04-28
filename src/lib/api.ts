import axios, { AxiosRequestConfig } from 'axios'

export type ApiError = {
	message: string
	errors?: Record<string, string[]>
}

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API_URL,
	headers: {
		'Content-Type': 'application/json',
		authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})

export async function apiClient<T>(
	endpoint: string,
	options: AxiosRequestConfig = {},
): Promise<T> {
	try {
		const response = await axiosInstance({
			url: endpoint,
			...options,
		})
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw error.response.data as ApiError
		}
		throw { message: 'An unexpected error occurred' } as ApiError
	}
}
