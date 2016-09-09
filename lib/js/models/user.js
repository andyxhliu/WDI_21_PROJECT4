angular
  .module('OneApp')
  .factory('User', User);

User.$inject = ["$resource"];
function User($resource) {
  return $resource('/users', { id: '@_id' }, {
    update: { method: "PUT" }
  });
}