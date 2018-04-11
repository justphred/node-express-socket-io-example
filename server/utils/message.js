var moment = require("moment");

var generateMessage = (from, text) => {
  return {
    from,
    text,
    // createdAt: new Date().getTime()
    createdAt: new moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, long) =>{
  return {
    from: from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    // createdAt: new Date().getTime()
    createdAt: new moment().valueOf()
  }
};

module.exports = {generateMessage, generateLocationMessage};
