const passport = require('passport')
const passportJWT = require("passport-jwt")
const strategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt
const User = require('../models/user.mongo')

passport.use(new strategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(), // extract token from Header
    secretOrKey: 'chatappln' // secret key used to verify the token
},
    async function (payload, done) { //find the associated user in DB and return the user if found
        return await User.findById(payload.sub)
            .then(user => {
                return done(null, user)
            }).catch(err => {
                return done(err)
            })
    }
))
//done() -> special function of passport.js to communicate result of authentication back to passport

