const router = require('express').Router()
const authController = require('../controllers/authController')

router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.get('/refreshToken', authController.refreshToken)

module.exports = router