import { isAxiosError } from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

function isErrorWithMessage(error: unknown): error is { message: string } {
	return (
		typeof error === 'object' &&
		error !== null &&
		typeof (error as { message?: unknown }).message === 'string'
	)
}

export function getApiErrorMessage(
	error: unknown,
	defaultMessage: string,
): string {
	if (isAxiosError(error)) {
		const apiErrorMessage = error.response?.data?.message
		if (typeof apiErrorMessage === 'string') {
			return apiErrorMessage
		}
		return error.message
	}
	if (isErrorWithMessage(error)) {
		return error.message
	}
	if (error instanceof Error) {
		return error.message
	}
	return defaultMessage
}
