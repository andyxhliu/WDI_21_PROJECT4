angular
  .module('OneApp')
  .controller("RoomsIndexController", RoomsIndexController);

RoomsIndexController.$inject = ["Room"];
function RoomsIndexController(Room) {
  this.all = Room.query();
}