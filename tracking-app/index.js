'use strict'
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const path = require('path')
const { join } = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const locationMap = new Map()

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.send('Hello world')
})

io.on('connection', socket => {
    socket.on('register-tracker', () => {
        locationMap.set(socket.id, { lat: null, lng: null })
    })

    socket.on('_ping', () => {
        console.log('got ping')
        socket.emit('_pong')
    })

    socket.on('update-location', pos => {
        if (locationMap.has(socket.id)) {
            locationMap.set(socket.id, pos)
            console.log(socket.id, pos)
        }
    })

    socket.on('request-location', () => {
        socket.emit('location-update', Array.from(locationMap))
    })
    socket.on('disconnect', () => {
        locationMap.delete(socket.id)
    })

})


server.listen(3000, err => {
    if (err) {
        throw err
    }
    console.log('server started on port 3000')
})

