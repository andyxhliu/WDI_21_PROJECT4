angular
  .module('OneApp')
  .controller("RoomsShowController", RoomsShowController);

RoomsShowController.$inject = ["Room", "$state"];
function RoomsShowController(Room, $state) {
  this.selected = Room.get($state.params);

  this.delete = function() {
    this.selected.$remove(function() {
      $state.go("roomsIndex");
    });
  }
}