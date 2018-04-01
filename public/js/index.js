
var socket = io(); // Initiating a request from client to server.

socket.on("connect", function () {
  console.log("Just connected to the server ...");

  socket.emit("createMessage", {
    to: "Mary's Lamb",
    text: "Hey, my fleece is white as snow!"
  });

});

socket.on("newMessage", function(email) {
  console.log("New message was received: ", email);
});

socket.on("disconnect", function () {
  console.log("Just got disconnected from the server ...")
});
