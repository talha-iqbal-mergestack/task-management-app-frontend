import { call, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import { authApi } from '@features/auth/api'
import { SigninCredentials, SigninResponse } from '@features/auth/signin/types'
import { SignupCredentials, SignupResponse } from '@features/auth/signup/types'
import {
	setCredentials,
	signinError,
	signinStart,
	signupError,
	signupStart,
} from '@features/auth/auth-slice'

function* handleSignin(action: PayloadAction<SigninCredentials>) {
	yield put(signinStart())
	try {
		const response: SigninResponse = yield call(authApi.signin, action.payload)
		localStorage.setItem('token', response.body.token)
		yield put(setCredentials({ token: response.body.token }))
	} catch (error: any) {
		yield put(signinError(error.message))
	}
}

function* handleSignup(action: PayloadAction<SignupCredentials>) {
	yield put(signupStart())
	try {
		const response: SignupResponse = yield call(authApi.signup, action.payload)
		yield put(setCredentials({ user: response.body }))
	} catch (error: any) {
		yield put(signupError(error.message))
		// yield put({ type: 'auth/signupFailure', payload: error.message })
	}
}

export function* authSagas() {
	yield takeEvery('auth/signin', handleSignin)
	yield takeEvery('auth/signup', handleSignup)
}
