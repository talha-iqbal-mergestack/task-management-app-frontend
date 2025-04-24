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
		setCredentials: (state, action) => {
			state.user = action.payload.user
			state.isAuthenticated = true
			state.loading = false
			state.error = null
		},
		signout: state => {
			state.user = null
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
		signupSuccess: (state, action) => {
			state.user = action.payload.user
			state.isAuthenticated = false
			state.loading = false
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
	signout,
	signinStart,
	signinError,
	signupStart,
	signupSuccess,
	signupError,
} = authSlice.actions
export const authReducer = authSlice.reducer
