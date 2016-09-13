angular
  .module('OneApp')
  .controller("RoomsIndexController", RoomsIndexController);

RoomsIndexController.$inject = ["Room", "$window", "$rootScope"];
function RoomsIndexController(Room, $window, $rootScope) {
  var socket = $window.io();
  var self = this;
  this.all = Room.query();

  // this.createRoom = function(room) {
  //   socket.emit("createRoom", room);
  //   console.log(room);
  // };

  // socket.on('message', function(message) {
  //   $rootScope.$evalAsync(function() {
  //     self.all.push(message);
  //   });
  // });

  // socket.on('createRoom', function(room) {
  //   console.log(room);
  // });

}