const express = require('express')
const port = 3002
const app = express()
let response = null
const cors = require('cors')
const start = require('./fetchData')

// config socket io
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
io.on('connection', (socket) => {
	console.log('user connected', socket)
})
app.use(cors())

// 21600000
app.listen(port, () =>
	console.log('Listening to port: http://localhost:' + port)
)
