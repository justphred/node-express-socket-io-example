var expect = require("expect");
var {generateMessage} = require("./message.js");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Peter Piper";
    var text = "Where are my peppers?";
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({
      from: from,
      text: text
    });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location message object", () => {
    // from: from,
    // url: `https://www.google.com/maps?q=${lat},${long}`,
    var from = "Peter Piper";
    var lat = 3;
    var long = 5;
    var message = generateLocationMessage(from, lat, long);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({
      from: from,
      text: url
    });
  });
});
