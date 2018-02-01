var socket = io();

function scrollToBottom() {
  //Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    };
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('updateUserList', function (users) {
  console.log('Users list', users);
});

socket.on('newMessage', function(message) {
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from
  });

  $('#messages').append(html);
  scrollToBottom();

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
    from: message.from,
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});
