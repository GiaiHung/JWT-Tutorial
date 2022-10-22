const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const token = req.headers.token

  if (token) {
    const accessToken = token.split(' ')[1] // Bearer ....
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: invalid token' })
      }
      req.user = decoded
      next()
    })
  } else {
    return res.status(401).json('You are not authenticated')
  }
} 

module.exports = verifyJWT
