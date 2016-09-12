angular
  .module('OneApp')
  .factory('User', User);

// User.$inject = ["$resource", "formData"];
User.$inject = ["$resource"];
// function User($resource, formData) {
//   return $resource('/users', { id: '@_id' }, {
//     update: { 
//       method: "PUT",
//       headers: { 'Content-Type': undefined },
//       transformRequest: formData.transform 
//     },
//     save: {
//       method: "POST",
//       headers: { 'Content-Type': undefined },
//       transformRequest: formData.transform
//     }
//   });
// }
function User($resource) {
  return $resource('/users', { id: '@_id' }, {
    update: { 
      method: "PUT"
    }
  });
}