const bcrypt = require('bcrypt');
const User = require('../models/user.mongo');
const jwt = require('jsonwebtoken');

const secretKey = 'chatappln';

async function registerController(req, res) {
    const {email, username, password} = req.body;

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        return res.status(409).json({
            error: 'User already exists!'
        });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({email, username, password: hashedPassword});
    await newUser.save();

    const token = generateToken(newUser);
    return res.status(201).json({token});
}

async function loginController(req, res) {
    //get user details
    const {email, password} = req.body;

    //check if either strings are empty
    if (!email || !password) {
        return res.status(400).json({
            error: "Missing credentials, please check again!"
        });
    }
    //Fetch the user with their email
    const currentUser = await User.findOne({email});
    //if user does not exist, email is not registered with us
    if (!currentUser) {
        return res.status(404).json({
            error: "Oops! cannot find email, you can register right away."
        });
    }

    const isPasswordValid = await checkPasswordValidity(password, currentUser);
    if (isPasswordValid) {
        const token = generateToken(currentUser);
        console.log(`${currentUser.username} has logged in successfully.`)
        return res.status(200).json({token});
    } else {
        return res.status(401).json({
            error: "Incorrect password"
        });
    }
}

async function logoutController(req,res) {
    res.status(200).send({
        message: "Log out succesful. Please clear your token."
    })
}//jwt logout controller has to be setup on client side by deleting the web tokens thats all 

async function checkPasswordValidity(password, user) {
    try {
        return await bcrypt.compare(password, user.password);
    } catch (err) {
        console.error(`Error comparing passwords: ${err}`);
        throw err; // It's usually not a good idea to throw errors like this; better to handle them gracefully
    }
}

function generateToken(user) {
    const payload = {sub: user._id};
    return jwt.sign(payload, secretKey);
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    registerController,
    loginController,
    logoutController
};
