import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { RootState } from '@store'
import {
	setCredentialsAction,
	signoutAction,
	signupSuccessAction,
} from '@store/slices/auth'
import { SigninResponse, SignupResponse } from '@features/auth/common/types'

export function useAuth() {
	const dispatch = useDispatch()
	const authState = useSelector((state: RootState) => state.auth)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwtDecode(token)
			dispatch(setCredentialsAction({ user }))
		}
	}, [dispatch])

	const signup = (data: SignupResponse) => {
		dispatch(signupSuccessAction({ user: data.body }))
	}

	const signin = (data: SigninResponse) => {
		localStorage.setItem('token', data.body.token)
		dispatch(setCredentialsAction({ user: jwtDecode(data.body.token) }))
	}

	const signout = () => {
		localStorage.removeItem('token')
		dispatch(signoutAction())
	}

	return {
		authState,
		signup,
		signin,
		signout,
	}
}

export type AuthContext = ReturnType<typeof useAuth>
