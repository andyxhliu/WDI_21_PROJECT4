angular
  .module('OneApp')
  .controller("UsersIndexController", UsersIndexController);

UsersIndexController.$inject = ["User"];
function UsersIndexController(User) {
  this.all = User.query();
  var self = this;

  socket.on('active', function(loggedInUser) {
    $rootScope.$applyAsync(function() {
      self.all.map(function(user) {
        if(loggedInUser._id === user._id) {
          user.active = true;
        }

        return user;
      });
    });
  });

  socket.on('away', function(loggedInUser) {
    $rootScope.$applyAsync(function() {
      self.all.map(function(user) {
        if(loggedInUser._id === user._id) {
          user.active = false;
        }

        return user;
      });
    });
  });
}