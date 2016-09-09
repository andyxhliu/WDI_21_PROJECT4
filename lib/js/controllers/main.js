angular
  .module('OneApp')
  .controller("MainController", MainController);

MainController.$inject = ["$auth", "$rootScope", "$state", "TokenService"];
function MainController($auth, $rootScope, $state, TokenService) {

  var self = this;
  
  this.currentUser = TokenService.decodeToken();
  this.connected = false;

  $rootScope.$on('connected', function() {
    self.connected = true;
  });

  $rootScope.$on('disconnected', function() {
    self.connected = false;
  });

  $rootScope.$on('unauthorized', function() {
    $state.go("login");
  });

  $rootScope.$on("loggedIn", function() {
    this.currentUser = TokenService.decodeToken();
    $state.go("main");
  });

  this.logout = function() {
    $auth.logout();
    this.currentUser = null;
    $state.go("login");
  }
}