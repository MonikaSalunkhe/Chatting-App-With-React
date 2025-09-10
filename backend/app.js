const express = require('express')
const http = require('http')
// const { Socket } = require('socket.io')
const Server = require('socket.io').Server

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
console.log("Connected");

socket.on("chat", chat => {
  io.emit("chat", chat)
})

socket.on("disconnect", () => {
  console.log("disconnected");
})

})
server.listen("3002", () => {
  console.log("running on 3002 port")

})