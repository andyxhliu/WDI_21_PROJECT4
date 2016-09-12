angular
  .module('OneApp')
  .controller("RoomsNewController", RoomsNewController);

RoomsNewController.$inject = ["Room", "$state", "User"];
function RoomsNewController(Room, $state, User) {
  this.new = {};
  this.users = User.query();

  this.create = function() {
    Room.save(this.new, function() {
      $state.go('roomsIndex');
    });
  }
}