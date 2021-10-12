import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const PORT = process.env.PORT || 4000
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } })

const clients = new Set<string>()

io.on('connection', (socket) => {
  clients.add(socket.id)
  socket.broadcast.emit('NEW_CONNECTED', socket.id)
  io.emit('TOTAL_CLIENTS', clients.size)
  socket.on('INCOMING_CHAT', (payload) => {
    io.emit('INCOMING_CHAT', {
      from: { id: socket.id, username: payload.username },
      content: payload.content,
      sentAt: new Date().toISOString(),
    })
  })
  socket.on('disconnect', () => {
    clients.delete(socket.id)
    io.emit('TOTAL_CLIENTS', clients.size)
    socket.broadcast.emit('DISCONNECTED', socket.id)
  })
  socket.on('SOMEONE_TYPING', (payload) => {
    socket.broadcast.emit('SOMEONE_TYPING', { id: socket.id, ...payload })
  })
})

server.listen(PORT, () => {
  console.log('🚀 Listening on http://localhost:%d', PORT)
})
