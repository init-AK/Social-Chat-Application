const express = require('express')
const { connectDB } = require('./utils/mongo')
const bodyParser = require('body-parser')
const { Server } = require('socket.io')
const { createServer } = require('http')
const { authRouter } = require('./routes/auth.router')


const app = express()
const httpServer = createServer(app)

app.use(bodyParser.json())

app.use('/auth', authRouter)
app.get('/', (req, res) => {
    res.send("Welcome to auth")
})


const PORT = 9090
function loadServer() {
    connectDB()
    httpServer.listen(PORT, () => {
        console.log(`Server listening on port : ${PORT}`)
    })

}

loadServer()
