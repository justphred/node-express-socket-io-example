
var socket = io(); // Initiating a request from client to server.

socket.on("connect", function () {
  console.log("Just connected to the server ...");

  // socket.emit("createMessage", {
  //   to: "Mary's Lamb",
  //   text: "Hey, my fleece is white as snow!"
  // });

});

socket.on("newMessage", function(msg) {
  console.log("New message was received: ", msg);
  var li = jQuery("<li></li>");

  li.text(`${msg.from}: ${msg.text}`);
  jQuery("#messages").append(li);
});

socket.on("disconnect", function () {
  console.log("Just got disconnected from the server ...")
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: jQuery("[name=message]").val()
    }, function () {
    }
  );
});

var locationButton = jQuery("#send-location");

locationButton.on("click", function() {
  if(!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position);
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert("Unable to fetch location")
  });
});

// socket.emit("createMessage", {
//   from: "Mary's Lamb",
//   text: "Hey, my fleece is white as snow!"
// }, function (serverResp) {
//   console.log("Message Ack'd by Server:", serverResp);
// });
