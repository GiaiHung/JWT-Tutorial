const bcrypt = require('bcrypt')
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
  login: async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if(!user) return res.status(404).json('Error: invalid username')

        const isValid = await bcrypt.compare(req.body.password, user.password)
        if(!isValid) return res.status(401).json('Error: invalid password')

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
  }
}

module.exports = authController
