angular
  .module("OneApp")
  .factory("Room", Room);

// Director.$inject = ["$resource", "formData"];
// function Director($resource, formData) {
//   return $resource('/api/directors/:id', { id: '@_id' },  {
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


Room.$inject = ["$resource"];
function Room($resource) {
  return $resource('/rooms/:id', { id: '@_id' },  {
    update: {
      method: "PUT"
    }
  });
}