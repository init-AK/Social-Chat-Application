const bcrypt = require('bcrypt')
const User  = require('../models/user.mongo')
const jwt = require('jsonwebtoken')

const secretKey = 'chatappln'

async function registerController(req,res) {
    //Take Email, username, password from user
    const {email, username, password} = req.body

    //Check if user already exists, if yes return
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists) {
        return res.status(409).json({
            error:'User already exists!'
        })
    }

    //Hash the password
    const hashedPassword = hashPassword(password)

    //if user doesnt exist, save user details to DB
    const newUser = new User({email, username, password:hashedPassword})
    await newUser.save()

    //generate JWT token
    const token = generateToken(newUser)

    res.status(201).json({token})
}

function generateToken(user) {
    //gather the payload from the user parameter
    const payload = {sub: user._id}

    //sign and create token using payload and secretKey
    const token = jwt.sign(payload, secretKey)

    return token
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword

}

module.exports = {
    registerController
}

