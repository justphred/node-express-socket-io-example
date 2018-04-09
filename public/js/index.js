
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

socket.on("newLocationMessage", function(msg) {
  var li = jQuery("<li></li>");
  var a = jQuery("<a target=_blank>my current location</a>");

  li.text(`${msg.from}: `);
  a.attr("href", msg.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  var msgTextInput = jQuery("[name=message]");
  socket.emit("createMessage", {
    from: "User",
    text: msgTextInput.val()
    }, function () {
      // This is the "acknowledgement callback function"
      // I think it gets called when the the server actually sends and ACK
      // Clear the text input box after posting the message contained therein
      msgTextInput.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if(!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  locationButton.attr("disabled", "disabled").text("Sending Location");
  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position);
    locationButton.removeAttr("disabled").text("Send Location");
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr("disabled").text("Send Location");
    alert("Unable to fetch location")
  });
});


// socket.emit("createMessage", {
//   from: "Mary's Lamb",
//   text: "Hey, my fleece is white as snow!"
// }, function (serverResp) {
//   console.log("Message Ack'd by Server:", serverResp);
// });
