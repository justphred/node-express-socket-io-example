var moment = require("moment");

// Unix epoch  Jan 1st 1970 00:00:00
// var date = new Date() ;
// console.log(date.getMonth());

var date = moment();
// console.log(date.format("MMM YYYY"));
// console.log(date.format("MMM Do, YYYY"));

// 7:35 am, 10 Apr, 2018
var myTimestamp = moment().valueOf();
console.log("My timestamp: ", myTimestamp);
console.log("My time: ", date.format("H:mm a, DD MMM, YYYY"));

// var createdAt = 0;
// var date2 = moment(createdAt);
// console.log(date2.format("H:mm a, DD MMM, YYYY"));
