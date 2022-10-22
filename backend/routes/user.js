const router = require('express').Router()
const usersController = require('../controllers/userController')
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', usersController.getAllUsers)
router.delete('/:id', verifyAdmin, usersController.deleteUser)

module.exports = router
