global.$ = $;

$(document).ready(function() {

  $('button').click(function(e) {
    var iframe = '<iframe id="main" width="100%" height="100%" seamless="seamless" src="http://0.0.0.0:9000/index.xhtml"></iframe>';
    
    var username = $('#username').val();
    var password = $('#password').val();
    var channel  = $('#channel').val();
    var server   = $('#server').val();

    require('./server')({ channel: channel, server: server, username: username, password: password });
    
    setTimeout(function() {
      $('body').html(iframe);
    }, 100);
  });

});