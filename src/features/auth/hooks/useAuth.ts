import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { RootState } from '@store'
import {
	setCredentials,
	signout as signoutAction,
} from '@features/auth/auth-slice'
import { SigninResponse, SignupResponse } from '@features/auth/types'

export function useAuth() {
	const dispatch = useDispatch()
	const authState = useSelector((state: RootState) => state.auth)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwtDecode(token)
			dispatch(setCredentials({ user }))
		}
	}, [dispatch])

	useEffect(() => {
		if (authState.user) {
			setIsAuthenticated(true)
		}
	}, [authState.user])

	const signup = (data: SignupResponse) => {
		dispatch(setCredentials({ user: data.body }))
	}

	const signin = (data: SigninResponse) => {
		localStorage.setItem('token', data.body.token)
		dispatch(setCredentials({ user: jwtDecode(data.body.token) }))
	}

	const signout = () => {
		localStorage.removeItem('token')
		dispatch(signoutAction())
	}

	return {
		isAuthenticated,
		authState,
		signup,
		signin,
		signout,
	}
}

export type AuthContext = ReturnType<typeof useAuth>
