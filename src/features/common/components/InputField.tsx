import { FieldType } from '@features/common/enums'
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'

type FormInputProps<TFormValues extends FieldValues> = {
	type: FieldType
	placeholder: string
	name: Path<TFormValues>
	register: UseFormRegister<TFormValues>
	error?: string
	isFirst?: boolean
	isLast?: boolean
}

export function InputField<TFormValues extends FieldValues>({
	type,
	placeholder,
	name,
	register,
	error,
	isFirst,
	isLast,
}: FormInputProps<TFormValues>) {
	return (
		<div>
			<input
				type={type}
				className={`
          appearance-none rounded-none relative block w-full px-3 py-2 
          border border-gray-300 placeholder-gray-500 text-gray-900 
          ${isFirst ? 'rounded-t-md' : ''} 
          ${isLast ? 'rounded-b-md' : ''} 
          focus:outline-none focus:ring-indigo-500 
          focus:border-indigo-500 focus:z-10 sm:text-sm
        `}
				placeholder={placeholder}
				{...register(name)}
			/>
			{error && <p className="text-red-500 text-xs italic">{error}</p>}
		</div>
	)
}
