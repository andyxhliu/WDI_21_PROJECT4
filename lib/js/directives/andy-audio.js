angular
  .module('OneApp')
  .directive('andyAudio', andyAudio);

andyAudio.$inject = ['$rootScope'];
function andyAudio($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element[0].onpause = function() {
        $rootScope.$broadcast('paused', this.currentTime);
      }
      element[0].onplay = function() {
        $rootScope.$broadcast('playing', this.currentTime);
      }
    }
  }
}