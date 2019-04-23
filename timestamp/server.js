// server.js
// where your node app starts

// init project
var express = require('express');
var dateFormat = require('dateformat');
var app = express();

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


// timestamp API endpoint
app.get('/api/timestamp/:date_string?', (req, res) => {
  let date = new Date();
  let date_str = req.params.date_string;
  // Check if date_str is not empty:
  if(date_str !== undefined) {
    // Passing date through Date applies Date.parse, if necessary
    date_str = date_str ? new Date(date_str) : new Date;
    // Check if date_str is an invalid date (including a unix timestamp)
    if(isNaN(date_str)) {
      // If date_str is not valid, attemp to convert to unix timestamp
      // This will also deal with the truly invalid dates
      date = new Date(parseInt(req.params.date_string));
    } else {
      date = new Date(dateFormat(req.params.date_string,"isoDateTime"));
    }
  }
  // Produce the desired API endpoint
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});