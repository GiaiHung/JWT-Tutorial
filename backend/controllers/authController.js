const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../config/generateToken')
const User = require('../models/User')

const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      if (!req?.body?.username || !req?.body?.password || !req?.body?.email)
        return res.sendStatus(401)

      const duplicate = await User.findOne({ username: req.body.username }).exec()
      if (duplicate) return res.status(401).json(`Sorry, user ${req.body.username} already exists`)

      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(req.body.password, salt)

      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      })

      res.status(201).json(user)
    } catch (error) {
      res.status(500).json(err)
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username })
      if (!user) return res.status(404).json('Error: invalid username')

      const isValid = await bcrypt.compare(req.body.password, user.password)
      if (!isValid) return res.status(401).json('Error: invalid password')

      // Sign JWT
      const accessToken = generateToken.access(user)
      const refreshToken = generateToken.refresh(user)

      // Store refresh token in cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: false, // change to true when deploy
        sameSite: 'strict', //prevent CSRF attacks
      })

      const { password, ...others } = user._doc

      res.status(200).json({ ...others, accessToken })
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // REFRESH TOKEN
  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json('You are not authenticated')
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if(err) return res.json(err)

      const newAccessToken = generateToken.access(user)
      res.status(200).json({accessToken: newAccessToken})
    })
  },
  // LOGOUT
  logout: async (req, res) => {
    res.clearCookie('refreshToken')
    res.status(200).json({ message: 'Successfully logged out' })
  }
}

module.exports = authController
