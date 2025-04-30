import { createSlice } from '@reduxjs/toolkit'

type State = {
	user: Record<string, string> | null
	isAuthenticated: boolean
	loading: boolean
	error: string | null
}

const initialState: State = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentialsAction: (state, action) => {
			state.user = action.payload.user
			state.isAuthenticated = true
			state.loading = false
			state.error = null
		},
		signoutAction: state => {
			state.user = null
			state.isAuthenticated = false
		},
		signinStartAction: state => {
			state.loading = true
			state.error = null
		},
		signinErrorAction: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		signupStartAction: state => {
			state.loading = true
			state.error = null
		},
		signupSuccessAction: (state, action) => {
			state.user = action.payload.user
			state.isAuthenticated = false
			state.loading = false
			state.error = null
		},
		signupErrorAction: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const {
	setCredentialsAction,
	signoutAction,
	signinStartAction,
	signinErrorAction,
	signupStartAction,
	signupSuccessAction,
	signupErrorAction,
} = authSlice.actions
export const authReducer = authSlice.reducer
