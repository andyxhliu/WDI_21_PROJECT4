angular
  .module('OneApp')
  .controller("RoomsNewController", RoomsNewController);

RoomsNewController.$inject = ["Room", "$state", "User"];
function RoomsNewController(Room, $state, User) {
  this.new = null;
  this.users = User.query();

  this.create = function() {
    console.log("hello");
    console.log(this.new);
    console.log(Room.save());
    Room.save(this.new, function() {
      console.log("in save");
      $state.go('roomsIndex');
    });
  }
}