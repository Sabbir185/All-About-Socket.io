const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(expressServer);


/*
  // test for socket connection
  io.on("connection", (socket) => {
    setTimeout(() => {
      socket.send("Sabbir Ahmmed (Server --> Client)");
    }, 3000);
  });
*/


/*
  // continues data send
  io.on("connection", (socket) => {
    setInterval(() => {
      const d = new Date();
      const time = d.toLocaleTimeString();
      socket.send(time);
    }, 1000);
  })
*/


/*
  // custom event create 
  io.on("connection", (socket) => {
    setInterval(() => {
      const date = new Date();
      const time = date.toLocaleTimeString();
      // here instead of send, we call emit function
      socket.emit('MyTime', time)
    }, 1000);
  })
*/


/*
  // custom event create 
  io.on("connection", (socket) => {
    console.log('New Connection')
      socket.on('message', (msg) => {
        console.log(msg)
      })
  })
*/



/*
  // broadcast --> io.sockets.emit
  io.on("connection", (socket) => {
    console.log("New user connected!");

    io.sockets.emit("MyBroadcast", 'Welcome to everyone!')
  })
*/


// Namespace create for specific task
const buyNsp = io.of("/buy");
const sellNsp = io.of("/sell");

buyNsp.on("connection", (socket)=> {
  buyNsp.emit("MyEvent", "This buy namespace event");
})

sellNsp.on("connection", (socket)=> {
  sellNsp.emit("MyEvent", "This sell namespace event");
})



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})


const port = 3000;
expressServer.listen(port, () => {
  console.log("Server listen ", port);
})