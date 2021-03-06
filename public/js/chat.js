
var socket = io(); // Initiating a request from client to server.

function scrollToBottom () {
  // Selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  // Heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMsgHeight = newMessage.innerHeight();
  var lastMsgHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
    // console.log("Should be scrolling here");
    messages.scrollTop(scrollHeight);
  }

} // End function scrollToBottom () {}

socket.on("connect", function () {
  console.log("Just connected to the server ...");
  var params = jQuery.deparam(window.location.search);
  socket.emit("join", params, function (err) {
    if(err){
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error in submitting join form"); 
    }
  });
}); // End socket.on("connect", function () {}

socket.on("newMessage", function(msg) {
  console.log("New message was received: ", msg);

  var template = jQuery("#message-template").html();
  var timeStamp = moment(msg.createdAt).format("h:mm a");
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    timestamp: timeStamp
  });
  jQuery("#messages").append(html);
  scrollToBottom();

  // var timeStamp = moment(msg.createdAt).format("h:mm a");
  // var li = jQuery("<li></li>");
  // li.text(`<${msg.from}> -${timeStamp}- ${msg.text}`);
  //
  // jQuery("#messages").append(li);
});


// socket.on("newLocationMessage", function(msg) {
//   var timeStamp = moment(msg.createdAt).format("h:mm a");
//   var li = jQuery("<li></li>");
//   var a = jQuery("<a target=_blank>my current location</a>");
//
//   li.text(`<${msg.from}> -${timeStamp}- `);
//   a.attr("href", msg.url);
//   li.append(a);
//   jQuery("#messages").append(li);
// });
socket.on("newLocationMessage", function(msg) {
  var template = jQuery("#location-message-template").html();
  var timeStamp = moment(msg.createdAt).format("h:mm a");
  var html = Mustache.render(template, {
    timestamp: timeStamp,
    from: msg.from,
    url: msg.url
  });

  jQuery("#messages").append(html);
  scrollToBottom();
});


socket.on("disconnect", function () {
  console.log("Just got disconnected from the server ...")
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
