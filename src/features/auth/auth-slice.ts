import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload.user
			state.token = action.payload.token
			state.isAuthenticated = true
		},
		logout: state => {
			state.user = null
			state.token = null
			state.isAuthenticated = false
		},
		signinStart: state => {
			state.loading = true
			state.error = null
		},
		signinError: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		signupStart: state => {
			state.loading = true
			state.error = null
		},
		signupError: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const {
	setCredentials,
	logout,
	signinStart,
	signinError,
	signupStart,
	signupError,
} = authSlice.actions
export const authReducer = authSlice.reducer
