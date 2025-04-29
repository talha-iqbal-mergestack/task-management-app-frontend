import { toast as sonnerToast, ExternalToast } from 'sonner'

type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning'

const typeStyles: Record<ToastType, Partial<ExternalToast['classNames']>> = {
	default: {
		toast: 'bg-popover text-popover-foreground border border-border',
		title: 'text-sm font-semibold',
		description: 'text-sm opacity-80',
	},
	success: {
		toast: 'bg-green-500 text-white border border-green-600',
		title: 'text-sm font-semibold text-white',
		description: 'text-sm text-white opacity-80',
		icon: 'text-green-300',
	},
	error: {
		toast: 'bg-red-600 text-white border border-red-700',
		title: 'text-sm font-semibold text-white',
		description: 'text-sm text-white opacity-80',
		icon: 'text-red-300',
	},
	info: {
		toast: 'bg-blue-500 text-white border border-blue-600',
		title: 'text-sm font-semibold text-white',
		description: 'text-sm text-white opacity-80',
		icon: 'text-blue-300',
	},
	warning: {
		toast: 'bg-yellow-400 text-black border border-yellow-600',
		title: 'text-sm font-semibold text-black',
		description: 'text-sm text-black opacity-80',
		icon: 'text-yellow-700',
	},
}

function baseToast(
	message: string,
	options: ExternalToast & { type?: ToastType } = {},
) {
	const type = options.type ?? 'default'

	const classNames = {
		...typeStyles[type],
		...options.classNames,
	}

	return sonnerToast(message, {
		...options,
		classNames,
	})
}

export const toast = {
	success: (msg: string, options?: ExternalToast) =>
		baseToast(msg, { ...options, type: 'success' }),
	error: (msg: string, options?: ExternalToast) =>
		baseToast(msg, { ...options, type: 'error' }),
	info: (msg: string, options?: ExternalToast) =>
		baseToast(msg, { ...options, type: 'info' }),
	warning: (msg: string, options?: ExternalToast) =>
		baseToast(msg, { ...options, type: 'warning' }),
	default: (msg: string, options?: ExternalToast) =>
		baseToast(msg, { ...options, type: 'default' }),
}
