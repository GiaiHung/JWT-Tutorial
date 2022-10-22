import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  allUsers: null,
  isError: false,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getUsersStart: (state) => {
      state.isFetching = true
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false
      state.allUsers = action.payload
      state.isError = false
    },
    getUsersFailure: (state) => {
      state.isFetching = false
      state.isError = true
    },
  },
})

export const { getUsersStart, getUsersSuccess, getUsersFailure } = userSlice.actions

export default userSlice.reducer
