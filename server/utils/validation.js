
// Returns true if str is a real string, false if it is not
var isRealString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

module.exports = {isRealString};
