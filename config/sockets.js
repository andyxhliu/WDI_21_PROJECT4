var socketioJwt = require('socketio-jwt');
var _ = require('underscore');
var secret = require('./tokens').secret;

module.exports = function(server) {
  var io = require('socket.io').listen(server);
  io.on('connection', function(socket) {
    console.log("Connected to socket with id: " + socket.id);

    socket.on('message', function(message) {
      console.log("message received from client", message);

      io.sockets.emit('message', message); //sending message to all
      // socket.emit('message', message); //Sending message to yourself
      // socket.broadcast.emit('message', message); //Sending message to everyone else
    });
  }); 

}