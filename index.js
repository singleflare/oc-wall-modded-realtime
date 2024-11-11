const express = require('express');
const { join } = require('path');
const app = express();
const server = app.listen(process.env.PORT || 3000)
app.use(express.static('public'));
app.use(express.json())
const ioServer = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/public/play.html'));
})

const playNs = ioServer.of('/')

playNs.on('connection', (socket) => {
  console.log('someone connected')
  socket.on('play', () => {
    playNs.emit('play')
  })
  socket.on('selectBrick', () => {
    playNs.emit('selectBrick')
  })
  socket.on('selectBrick', (brick) => {
    playNs.emit('selectBrick', brick)
    console.log(brick)
  })
})