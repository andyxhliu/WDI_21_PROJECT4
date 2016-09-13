var socketioJwt = require('socketio-jwt');
var _ = require('underscore');
var secret = require('./tokens').secret;

module.exports = function(server) {
  var usernames = {};
  var io = require('socket.io').listen(server);
  
  io.on('connection', function(socket) {
    console.log("Connected to socket with id: " + socket.id);

    // socket.on('createRoom', function(room) {
    //   console.log("Room created from user", room);
    //   io.sockets.emit("createRoom", room)
    // });

    // socket.on('message', function(message) {
    //   console.log("message received from client", message);

    //   io.sockets.emit('message', message); //sending message to all
    //   // socket.emit('message', message); //Sending message to yourself
    //   // socket.broadcast.emit('message', message); //Sending message to everyone else
    // });

    socket.on('inviteUser', function(data) {
      // io.sockets.emit('inviteUser', data);
      socket.userId = data.user._id;
      socket.userName = data.user.name;
      socket.roomId = data.room._id;
      socket.roomName = data.room.name;
      // usernames[username] = data.user.name;
      socket.join(data.room._id);
      socket.emit('updatechat', 'SERVER', 'you have joined ' + data.room.name);
      socket.broadcast.to('data.room._id').emit('updatechat', 'SERVER', data.user.name + ' has connected to this room');
    })

    socket.on('sendchat', function (message) {
      io.sockets.in(socket.roomId).emit('updatechat', socket.userName, message);
    });

    socket.on('switchRoom', function(newroom){
      // leave the current room (stored in session)
      socket.leave(socket.room);
      // join new room, received as function parameter
      socket.join(newroom);
      socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
      // sent message to OLD room
      socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
      // update socket session room title
      socket.room = newroom;
      socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
      socket.emit('updaterooms', rooms, newroom);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
      // remove the username from global usernames list
      delete usernames[socket.userName];
      // update list of users in chat, client-side
      io.sockets.emit('updateusers', usernames);
      // echo globally that this client has left
      socket.broadcast.emit('updatechat', 'SERVER', socket.userName + ' has disconnected');
      socket.leave(socket.room);
    });


  }); 

  
    // io.on('connection', socketioJwt.authorize({
    //   secret: secret,
    //   timeout: 15000 // 15 seconds to send the authentication message
    // })).on('authenticated', function(socket) {
    //   console.log("Connected to socket with id: " + socket.id);
    // })

}
