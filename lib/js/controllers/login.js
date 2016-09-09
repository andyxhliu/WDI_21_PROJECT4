angular
  .module("OneApp")
  .controller("LoginController", LoginController);

LoginController.$inject = ["$auth", "$state", "$rootScope"];
function LoginController($auth, $state, $rootScope) {

  this.credentials = {};

  this.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(res) {
        $rootScope.$broadcast("loggedIn");
      });
  }

  this.submit = function() {
    $auth.login(this.credentials, {
      url: "/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('main');
    })
  }
}