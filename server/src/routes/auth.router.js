const express = require('express')
const authRouter = express.Router()

const {registerController, loginController, logoutController} = require('./auth.controller')
require('../middleware/passport')

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)

authRouter.post('/logout', logoutController)

module.exports = {
    authRouter
}
