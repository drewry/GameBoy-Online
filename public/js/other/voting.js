var counter = 10,
    codes   = { start: 13, select: 16, a: 88, b: 90, up: 38, right: 39, down: 40, left: 37 };

setInterval(function() {
  counter--;

  if(counter == 0) {
    counter = 10;

    // send get
    $.get('/poll', {}, function(res) {

      if(res.length > 0) {
        var highest = _.max(res, function(command){ return command.result; });

        // register keypress
        keyDown({ keyCode: codes[highest.command] });
        setTimeout(function() {
          keyUp({ keyCode: codes[highest.command] });
        }, 50);

        var html = '';

        // build results
        for(var i = 0; i < res.length; i++) {
          var command = res[i];

          if(command.command === highest.command) {
            var classes = ' class="selected"';
          } else {
            var classes = '';
          }

          html += '<li' + classes + '><strong>' + command.command + '</strong> - ' + Math.round(command.result * 100) + '%</li>';
        }

        $('#vote_results').html(html);
      } else {
        $('#vote_results').html('<li>No votes</li>');
      }

    });
  }
  
  $('#vote_counter').html(counter + ' seconds');
}, 1000);