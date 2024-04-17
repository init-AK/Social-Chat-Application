const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL

function connectDB() {
    mongoose.connect(url)
}

mongoose.connection.once('open', () => {
    console.log('Successfully connected to Mongo DB')
})

mongoose.connection.on('error', () => {
    console.log('Could not connect to DB')
})


module.exports = { connectDB } 
