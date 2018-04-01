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

  // Send a new message to each users as they connect to the server.
  // socket.emit("newMessage", {
  //   from: "Tom Thumb",
  //   text: "Where's the pie?",
  //   createdAt: 1234
  // });

  // From user to server ... "here's a new message to distribute to others"
  socket.on("createMessage", (msg) => {
    // Expect a "from" identifier and a text string containing the message.
    // We'll need to generate a timestamp to add to the message before it gets distributed
    var date = new Date();
    console.log("event:createMessage ", date, msg);

    // Distribute the new/incoming message to all connected users.
    io.emit("newMessage", {
      from: msg.from,
      text: msg.text,
      createdAt: date.getTime()
    });
  });

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
