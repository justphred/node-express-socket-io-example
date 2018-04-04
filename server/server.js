const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage} = require("./utils/message.js");

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  // Send a welcome message to each users as they connect to the server.
  // { from: "Admin", text: "Wilkomen to our chatter apptung!", createdAt: new Date().getTime()}
  socket.emit("newMessage", generateMessage("Admin", "Wilkomen to our chatter app-tung!")
  );
  // Let (other) connected users know that someone just joined the chatter.
  // {from: "Admin", text: "Someone just joined the chatter ...", createdAt: new Date().getTime()}
  socket.broadcast.emit("newMessage", generateMessage("Admin", "Someone just joined the chatter ..."));

  // From user to server ... "here's a new message to distribute to others"
  socket.on("createMessage", (msg, callback) => {
    // Expect a "from" identifier and a text string containing the message.
    // We'll need to generate a timestamp to add to the message before it gets distributed
    var date = new Date();
    console.log("event:createMessage ", date, msg);

    // Distribute the new/incoming message to all connected users.
    // {from: msg.from, text: msg.text, createdAt: date.getTime()}
    io.emit("newMessage", generateMessage(msg.from, msg.text));
    callback("AckBack");
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newMessage", generateMessage("Admin", `${coords.latitude}, ${coords.longitude}`));
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
