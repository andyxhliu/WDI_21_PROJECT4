angular
  .module('OneApp')
  .controller("RoomsShowController", RoomsShowController);

RoomsShowController.$inject = ["Room", "$state", "$window", "$rootScope", "Message"];
function RoomsShowController(Room, $state, $window, $rootScope, Message) {
  this.selected = Room.get($state.params);

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
    // socket.emit("message", this.message);
    socket.emit('sendchat', this.message);
    this.message = null;
  };

  ///Invite User
  this.inviteUser = function(user, room) {
    socket.emit('inviteUser', {user: user, room: room});
  }

  //update chat
  socket.on('updatechat', function (username, data) {
    var message = username + ": " + data;
    $rootScope.$evalAsync(function() {
      self.all.push(message);
    });
  });

  //Message
  socket.on('message', function(message) {
    $rootScope.$evalAsync(function() {
      self.all.push(message);
    });
  });


}