import { all } from 'redux-saga/effects'

import { authSagas } from '@store/sagas/auth'

export function* rootSaga() {
	yield all([authSagas()])
}
