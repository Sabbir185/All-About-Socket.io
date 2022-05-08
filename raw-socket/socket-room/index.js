const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);

// server side socket connection
const { Server } = require("socket.io");
const io = new Server(expressServer);


// create room with 'join' keyword
io.on("connection", (socket) => {
  socket.join('kitchen-room');
  const cookerSize = io.sockets.adapter.rooms.get("kitchen-room").size;
  io.sockets.in("kitchen-room").emit("cooking", "Cooking is preparing by "+ cookerSize +" cookers");
  io.sockets.in("kitchen-room").emit("boiling", "Water is boiling..");

  socket.join('bed-room');
  const persons = io.sockets.adapter.rooms.get("bed-room").size;
  io.sockets.in("bed-room").emit("sleeping", "I'm sleeping now.");
  io.sockets.in("bed-room").emit("resting", "It is time to rest = " + persons);
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 3000;
expressServer.listen(port, () => {
  console.log("Server is listening : ", port);
});
