const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);

// server side socket connection
const { Server } = require("socket.io");
const io = new Server(expressServer);


io.on("connection", (socket) => {
  // get data from client side
  socket.on("MsgFromClient", (msg) => {
    // send data from server side to client side same msg
    io.emit("MsgFromServerToCLient", msg)
  });
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = 3000;
expressServer.listen(port, () => {
  console.log("Server is listening : ", port);
});
