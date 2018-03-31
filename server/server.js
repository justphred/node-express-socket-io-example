const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  socket.on("disconnect", () => {
    console.log("A user just disconnected ...");
  });
});


// app.listen(port, () => {
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// bottomline
//  https://sheltered-oasis-39001.herokuapp.com/
//  http://localhost:3000/socket.io/socket.io.js
