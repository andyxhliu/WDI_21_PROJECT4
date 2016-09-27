angular
  .module('OneApp')
  .controller("RoomsIndexController", RoomsIndexController);

RoomsIndexController.$inject = ["Room", "$window", "$rootScope", "TokenService"];
function RoomsIndexController(Room, $window, $rootScope, TokenService) {
  var socket = $window.io();
  var self = this;
  this.current = null;
  // Room.query(function(rooms) {
  //   self.all = rooms;

  //   self.current = rooms.filter(function(room) {
  //     return room.name === "general";
  //   })[0];

  //   $rootScope.$broadcast("currentChannel", self.current);
  // });
  
  this.all = Room.query();
  this.currentUser = TokenService.decodeToken();

  // this.joinRoom = function(user, room) {
  //   socket.emit('joinRoom', {user: user, room: room});
  //   console.log("room controller joinRoom function", user, room);
  // }

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