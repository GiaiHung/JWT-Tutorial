/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from '../redux/authSlice'
import { getUsersFailure, getUsersStart, getUsersSuccess } from '../redux/userSlice'



export const loginUser = async (dispatch, navigate, user) => {
  dispatch(loginStart())
  try {
    const res = await axios.post('http://localhost:5000/v1/auth/login', user)
    dispatch(loginSuccess(res.data))
    navigate('/')
  } catch (error) {
    dispatch(loginFailure())
  }
}

export const registerUser = async (dispatch, navigate, user) => {
  dispatch(registerStart())
  try {
    await axios.post('http://localhost:5000/v1/auth/register', user)
    dispatch(registerSuccess())
    navigate('/login')
  } catch (error) {
    dispatch(registerFailure())
  }
}

export const logoutUser = async (dispatch, navigate, accessToken) => {
  dispatch(logoutStart())
  try {
    await axios.get('http://localhost:5000/v1/auth/logout', {
      headers: {
        token: `Bearer ${accessToken}`
      }
    })
    dispatch(logoutSuccess())
    navigate('/login')
  } catch (error) {
    dispatch(logoutFailure())
  }
}

export const getAllUsers = async (dispatch, accessToken) => {
  dispatch(getUsersStart())
  try {
    const users = await axios.get('http://localhost:5000/v1/user', {
      headers: {
        token: `Bearer ${accessToken}`
      }
    })
    dispatch(getUsersSuccess(users.data))
  } catch (error) {
    dispatch(getUsersFailure())
  }
}
