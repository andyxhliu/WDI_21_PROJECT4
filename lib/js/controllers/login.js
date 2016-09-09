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
        $state.go('main');
      });
  }

  this.submit = function() {
    console.log("hello");
    $auth.login(this.credentials, {
      url: "/login"
    }).then(function(){
      $rootScope.$broadcast("loggedIn");
      $state.go('main');
    })
  }
}
