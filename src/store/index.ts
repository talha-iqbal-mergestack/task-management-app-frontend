import { configureStore } from '@reduxjs/toolkit'
// import createSagaMiddleware from 'redux-saga'
// import { rootSaga } from '@store/rootSaga'
import { rootReducer } from '@store/root-reducer'

// const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	// .concat(sagaMiddleware),
})

// sagaMiddleware.run(rootSaga)
