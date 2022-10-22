const router = require('express').Router()
const authController = require('../controllers/authController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.get('/refresh', authController.refreshToken)
router.get('/logout', verifyJWT, authController.logout)

module.exports = router