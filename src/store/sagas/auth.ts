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
	setCredentials,
	signinError,
	signinStart,
	signupError,
	signupStart,
	signupSuccess,
} from '@store/slices/auth'
import { router } from '@src/App'

function* handleSignin(action: PayloadAction<SigninCredentials>) {
	yield put(signinStart())
	try {
		const response: SigninResponse = yield call(authApi.signin, action.payload)
		localStorage.setItem('token', response.body.token)
		yield put(setCredentials({ user: jwtDecode(response.body.token) }))
		yield call([router, router.navigate], { to: '/dashboard' })
	} catch (error) {
		yield put(signinError(error.message))
	}
}

function* handleSignup(action: PayloadAction<SignupCredentials>) {
	yield put(signupStart())
	try {
		const response: SignupResponse = yield call(authApi.signup, action.payload)
		yield put(signupSuccess({ user: response.body }))
		yield call([router, router.navigate], { to: '/signin' })
	} catch (error) {
		yield put(signupError(error.message))
	}
}

export function* authSagas() {
	yield takeEvery('auth/signin', handleSignin)
	yield takeEvery('auth/signup', handleSignup)
}
