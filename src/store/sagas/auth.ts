import { call, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

import { authApi } from '@features/auth/common/api'
import {
	SigninCredentials,
	SigninResponse,
	SignupCredentials,
	SignupResponse,
} from '@features/auth/common/types'
import {
	setCredentialsAction,
	signinErrorAction,
	signinStartAction,
	signupErrorAction,
	signupStartAction,
	signupSuccessAction,
} from '@store/slices/auth'
import { router } from '@src/App'
import { getApiErrorMessage } from '@utils/index'

function* handleSignin(action: PayloadAction<SigninCredentials>) {
	yield put(signinStartAction())
	try {
		const response: SigninResponse = yield call(authApi.signin, action.payload)
		localStorage.setItem('token', response.body.token)
		yield put(setCredentialsAction({ user: jwtDecode(response.body.token) }))
		yield call([router, router.navigate], { to: '/dashboard' })
	} catch (error) {
		yield put(
			signinErrorAction(
				getApiErrorMessage(error, 'An unexpected signin error occurred'),
			),
		)
	}
}

function* handleSignup(action: PayloadAction<SignupCredentials>) {
	yield put(signupStartAction())
	try {
		const response: SignupResponse = yield call(authApi.signup, action.payload)
		yield put(signupSuccessAction({ user: response.body }))
		yield call([router, router.navigate], { to: '/signin' })
	} catch (error) {
		yield put(
			signupErrorAction(
				getApiErrorMessage(error, 'An unexpected signup error occurred'),
			),
		)
	}
}

export function* authSagas() {
	yield takeEvery('auth/signin', handleSignin)
	yield takeEvery('auth/signup', handleSignup)
}
