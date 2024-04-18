const express = require('express')
const authRouter = express.Router()

const {registerController, loginController} = require('./auth.controller')
require('../middleware/passport')

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)

// router.post('/logout', logoutController)

module.exports = {
    authRouter
}
