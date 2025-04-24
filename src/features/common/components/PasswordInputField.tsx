import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { InputField } from '@features/common/components'
import { FieldType } from '@features/common/enums'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { SigninFormValues } from '@features/auth/signin/types'

export function PasswordInputField({
	register,
	errors,
}: {
	register: UseFormRegister<SigninFormValues>
	errors: FieldErrors<SigninFormValues>
}) {
	const [passwordType, setPasswordType] = useState(FieldType.password)

	return (
		<div className="relative">
			<InputField
				type={passwordType}
				name="password"
				placeholder="Password"
				register={register}
				error={errors.password?.message}
				isLast
			/>
			<div
				className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
				onClick={() =>
					setPasswordType(type =>
						type === FieldType.password ? FieldType.text : FieldType.password,
					)
				}
			>
				{passwordType === FieldType.text ? (
					<EyeOff size={20} />
				) : (
					<Eye size={20} />
				)}
			</div>
		</div>
	)
}
