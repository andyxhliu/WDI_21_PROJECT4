angular
  .module('OneApp')
  .controller("RoomsShowController", RoomsShowController);

RoomsShowController.$inject = ["Room", "$state", "$window", "$rootScope", "Message", "User", "TokenService"];
function RoomsShowController(Room, $state, $window, $rootScope, Message, User, TokenService) {
  this.title = "Please join a room to chat!";
  this.selected = Room.get($state.params);
  this.currentUser = TokenService.decodeToken();
  this.currentRoomId = null;
  this.currentRoomName = null;
  this.joinedRoom = false;

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("roomsIndex");
    });
  }

  var socket = $window.io();
  // var socket = $window.io("http://localhost:3000"); <--If we were running it for more server
  var self = this;

  this.message = null;

  // this.notification = null;

  this.all = [];

  this.sendMessage = function() {
    socket.emit('sendchat', this.message);
    socket.emit("message", { content: this.message, room: self.selected, user: self.currentUser });
    this.message = null;
  };

  this.switchRoom = function(room) {
    socket.emit('switchRoom', room);
  };

  // this.storeRoomData = function(roomId, roomName) {
  //   self.currentRoomId = roomId;
  //   self.currentRoomName = roomName;
  //   console.log("hello!");
  // };

  // ///Invite User
  // this.inviteUser = function(user, room) {
  //   socket.emit('inviteUser', {user: user, room: room});
  // }

  //join Room
  this.joinRoom = function(user, room) {
    socket.emit('joinRoom', {user: user, room: room});
    Message.query({ roomId: room._id }, function(res) {
      $rootScope.$evalAsync(function() {
        self.all = res;
      });
    });
    self.joinedRoom = true;
  };

  //leave Room
  this.leaveRoom = function(user, room) {
    socket.emit('leaveRoom', {user: user, room: room});
  };

  // //get Room and user info
  // socket.on('roomData', function(data) {
  //   console.log(data);
  //   console.log(self);
  //   // $rootScope.$evalAsync(function() {
  //     // self.currentRoomId = data.roomId;
  //     // self.currentRoomName = data.roomName;
  //   // });
  //   self.storeRoomData(data.roomId, data.roomName);
  //   console.log(self);
  // })

  socket.on('updatechat', function (username, data) {
    console.log("in updatechat");
    var message = {user: { name: username }, content: data };
    // var message = username + ": " + data;
    $rootScope.$evalAsync(function() {
      self.all.push(message);
      console.log(self.all);
    });
    // Message.query({ roomId: data.room._id }, function(res) {
    //   $rootScope.$evalAsync(function() {
    //     self.all = res;
    //   });
    // });
  });

  //Message
  // socket.on("message", function(data) {
  //   if(data.channel._id === self.currentChannel._id) {
  //     $rootScope.$applyAsync(function() {
  //       var message = new Message(data);
  //       self.all.push(message);
  //     });
  //   }
  // });
  // socket.on('message', function(message) {
  //   console.log("in message");
  //   $rootScope.$evalAsync(function() {
  //     self.all.push(message);
  //   });
  // });

  //update room
  socket.on('updaterooms', function(room) {
    console.log("in updateRoom");
    $rootScope.$evalAsync(function() {
      self.title = room.name;
    });
  });

  this.chatBegin = function(roomId, roomName) {
    console.log("in chatBegin", self.currentRoomId, self.currentRoomName);
    socket.emit('chatBegin', {user: self.currentUser, roomId: roomId, roomName: self.roomName });
  }
}