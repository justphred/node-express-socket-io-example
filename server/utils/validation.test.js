const expect = require("expect");
const {isRealString} = require("./validation");

// isRealString
  // should reject non-string values
  // should reject string with only spaces
  // should allow string with non-space characters

describe("isRealString", () => {
  it("should reject non-string values", () => {
    var nottaString = 12345;
    var res = isRealString(nottaString);
    expect(res).toBe(false);
  });

  it("should reject string with only spaces", () => {
    var res = isRealString("    ");
    expect(res).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    var res = isRealString("This is a a string    ");
    expect(res).toBe(true);
  });
});
