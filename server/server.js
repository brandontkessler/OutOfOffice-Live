const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name)) {
      return callback('Name is required');
    }

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name);

    io.emit('updateUserList', users.getUserList());

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.emit('newMessage', generateMessage(user.name, message.text));

    }
    callback();
  });

  socket.on('disconnect', (socket) => {
    users.removeUser(socket.id);
    io.emit('updateUserList', users.getUserList());

  })
})

server.listen(port, () => {
  console.log(`Started port ${port}.`);
});
