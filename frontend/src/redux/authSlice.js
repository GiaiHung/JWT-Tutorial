import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    isError: false,
  },
  register: {
    isSuccess: false,
    isFetching: false,
    isError: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload
      state.login.isFetching = false
      state.login.isError = false
    },
    loginFailure: (state) => {
      state.login.isFetching = false
      state.login.isError = true
    },
    registerStart: (state) => {
      state.register.isFetching = true
    },
    registerSuccess: (state) => {
      state.register.isSuccess = true
      state.register.isFetching = false
      state.register.isError = false
    },
    registerFailure: (state) => {
      state.register.isFetching = false
      state.register.isError = true
    },
    logoutStart: (state) => {
      state.login.isFetching = true
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null
      state.login.isFetching = false
      state.login.isError = false
    },
    logoutFailure: (state) => {
      state.login.isFetching = false
      state.login.isError = true
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions

export default authSlice.reducer
