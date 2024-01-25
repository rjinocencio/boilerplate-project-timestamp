// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

function isValidDate(dateString) {
  if(!dateString || Number(dateString)) return true
  return !isNaN(Date.parse(dateString));
}

app.get('/api/:date?', (req,res) => {
  const input = req.params.date
  if(!isValidDate(input)) return res.json({
    "error": "Invalid Date"
  })
  const date = Number(input) ? new Date(+input) : input ? new Date(input) : new Date()
  const unix = date.getTime()
  const utc = date.toUTCString()
  return res.json({
    "unix": unix,
    "utc": utc
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
