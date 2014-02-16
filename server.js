// Get the lib
var fs      = require("fs"),
    irc     = require("irc"),
    _       = require("underscore")._,
    express = require("express"),
    app     = express();

// app configs
app.use(express.static('./public'));

var channel = 'gamebot',
    server  = 'irc.freenode.net';

// defaults
var commands = { start: 0, select: 0, a: 0, b: 0, up: 0, right: 0, down: 0, left: 0 },
    accepted = ['start', 'select', 'a', 'b', 'up', 'right', 'down', 'left']
    total    = 0,
    results  = [];

// the bot
module.exports = function(options) {
  console.log(options);

  // Create the configuration
  var config = {
    channels : ["#" + options.channel],
    server   : options.server,
    username : options.username,
    password : options.password
  };

  // Create the bot name
  var bot = new irc.Client(config.server, config.username, {
    channels: config.channels,
    password: config.password
  });

  // listen to the messages
  bot.addListener("message", function(from, to, text, message) {
    var command = text.toLowerCase();
    
    if(_.contains(accepted, command)) {
      commands[command]++;
      total++;
    }
  });
}

app.get('/poll', function(req, res) {

  // reset results
  results = [];

  // go through each and calculate the top results
  if(total > 0) {
    _.each(commands, function(value, index) {
      if(value > 0) {
        results.push({ command: index, result: value / total }); 
      }
    });
  }

  // reset everything
  total    = 0,
  commands = { start: 0, select: 0, a: 0, b: 0, up: 0, right: 0, down: 0, left: 0 };
  
  res.send(results);
});

app.get('/', function(req, res) { res.redirect('/index.xhtml'); });

app.listen(9000, function() { console.log('Listening on port 9000') });