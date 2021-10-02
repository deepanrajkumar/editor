var express = require("express");
var app = express();
var bodyParser = require("body-parser");

bodyParser.json();
app.listen(2000);

app.post("/", function (req, res) {
  console.log(req.body); // populated!
  res.status(200).send(JSON.stringify(req.body));
});
