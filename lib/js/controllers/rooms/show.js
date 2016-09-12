angular
  .module('OneApp')
  .controller("RoomsShowController", RoomsShowController);

RoomsShowController.$inject = ["Room", "$state", "$window", "$rootScope"];
function RoomsShowController(Room, $state, $window, $rootScope) {
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

  this.all = [];

  this.sendMessage = function() {
    console.log("hello");
    socket.emit("message", this.message);
    this.message = null;
  };

  this.sayHello = function() {
    console.log("Hello");
  }

  socket.on('message', function(message) {
    $rootScope.$evalAsync(function() {
      self.all.push(message);
    });
  });
}