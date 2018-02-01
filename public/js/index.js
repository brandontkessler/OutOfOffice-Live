var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function(message) {
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from
  });

  $('#messages').append(html);

  // console.log('New message', message)
  // var li = $('<li></li>');
  // li.text(`${message.from}: ${message.text}`);
  //
  // $('#messages').append(li);
});


var messageTextbox = $('[name=message]');
$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});
