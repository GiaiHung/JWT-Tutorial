const jwt = require('jsonwebtoken')

const generateToken = {
  access: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '30s' }
    )
  },
  refresh: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '30d' }
    )
  },
}

module.exports = generateToken 
