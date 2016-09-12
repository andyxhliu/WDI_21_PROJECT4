angular
  .module('OneApp')
  .controller("UsersIndexController", UsersIndexController);

UsersIndexController.$inject = ["User"];
function UsersIndexController(User) {
  this.all = User.query();
}