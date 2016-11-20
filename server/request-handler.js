var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());
var jsonParser = bodyParser.json();

var messages = [];

var findRoomMessages = function(room, messages) {
  var roomMessages = [];

  for (var i = 0; i < messages.length; i++) {
    if (messages[i].roomname === room) {
      roomMessages.push(messages[i]);
    }
  }

  return roomMessages;
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/classes/messages/', jsonParser, function (req, res) {
  res.json({results: messages});
});

router.post('/classes/messages/', jsonParser, function(req, res) {
  var username = req.param('username');
  var text = req.param('text');
  var roomname = req.param('roomname');

  messages.push({username: username, text: text, roomname: roomname});
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

router.get('/classes/:room', function(req, res) {
  var roomname = req.param('room');
  var roomMsgs = findRoomMessages(roomname, roomMessages);
  res.json({results: roomMsgs});
});