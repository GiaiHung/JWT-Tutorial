const authRouter = require('./auth')
const userRouter = require('./user')
const verifyJWT = require('../middleware/verifyJWT')

function route(app) {
    app.use('/v1/auth', authRouter)
    app.use(verifyJWT)
    app.use('/v1/user', userRouter)
}

module.exports = route
