const express = require('express')
const authRouter = express.Router()

const {registerController} = require('./auth.controller')
require('../middleware/passport')

authRouter.post('/register', registerController)

// router.get('/login', loginController)

// router.post('/logout', logoutController)

module.exports = {
    authRouter
}
