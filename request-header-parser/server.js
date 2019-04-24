// server.js
// where your node app starts

// init project
var express = require('express');
var requestIp = require('request-ip');
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
app.get('/api/whoami', (req, res) => {
  // Produce the desired API endpoint
  res.json({ipaddress: requestIp.getClientIp(req), 
            language: req.header('Accept-Language'), 
            software: req.header('User-Agent')});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});