import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userSlice from './userSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userSlice
    }
})

export default store