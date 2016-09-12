angular
  .module('OneApp')
  .controller("RoomsEditController", RoomsEditController);

RoomsEditController.$inject = ["Room", "$state", "User"];
function RoomsEditController(Room, $state, User) {
  this.selected = Room.get($state.params);
  this.users = User.query();

  this.save = function() {
    this.selected.$update(function() {
      $state.go('roomsShow', $state.params);
    });
  }
}