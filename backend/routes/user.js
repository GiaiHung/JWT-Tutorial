const router = require('express').Router()
const usersController = require('../controllers/userController')

router.get('/', usersController.getAllUsers)
router.delete('/:id', usersController.deleteUser)

module.exports = router
