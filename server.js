// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
const timeFormats= [
  "X",
  "YYYY-MM-DD",
  "D-MM-YYYY"
  

];
const timeParser = function(val){
  const date = moment(val,timeFormats, true);
  const output ={
    unix: null,
    utc: "Invalid Date"
  };
  if(date.isValid()){
    output.unix = +date.format("X");
    output.utc = date.format("LLL LTS");
  }
  return output;
};

app.get("/:time?",function(req,res){
  const output = timeParser(req.params.time);
  res.send(JSON.stringify(output));
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});