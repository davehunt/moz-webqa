var request = require('request');
var express = require('express');
var http = require('http');

var app = express();
app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/static'));
var server = http.createServer(app);

var data = {};

function update() {
  request(
    "https://webqa-ci.mozilla.com/view/Supervised/api/json",
    function (error, response, body) {
      if (body) {
        try {
          data = JSON.parse(body);
        } catch (e) {
          console.error(e);
        }
      }
      setTimeout(update, 10000);
    }
  );
}

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

app.get('/update', function(req, res) {
  res.json(data);
});

update();

server.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
