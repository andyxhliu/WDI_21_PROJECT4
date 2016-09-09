angular
  .module("OneApp")
  .controller("RegisterController", RegisterController);

RegisterController.$inject = ["$auth", "$state", "$rootScope"];
function RegisterController($auth, $state, $rootScope) {

  this.user = {};

  this.submit = function() {
    console.log(this.user);
    $auth.signup(this.user, {
      url: '/register',
    })
    .then(function(res){
      $state.go("login");
    })
  }
}
