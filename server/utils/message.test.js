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
