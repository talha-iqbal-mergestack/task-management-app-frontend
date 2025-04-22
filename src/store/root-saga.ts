import { all } from 'redux-saga/effects'

import { authSagas } from '@features/auth/auth-sagas'

export function* rootSaga() {
	yield all([authSagas()])
}
