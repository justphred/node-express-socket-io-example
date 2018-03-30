const express = require("express");
const path = require("path");

const publicPath = path.join(__dirname, "../public");
const app = express();

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// app.get("/", (req, res) => {
//   res.send("<h1> Hello Cruel World!</h1>");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// bottomline
