angular
  .module('OneApp')
  .controller("MessagesController", MessagesController);

MessagesController.$inject = ["$rootScope", "socket", "Message"];
function MessagesController($rootScope, socket, Message) {

  // var self = this;

  // this.connected = false;
  // this.currentRoom = null;
  // this.new = null;
  // this.all = [];

  // this.delete = function(message) {
  //   socket.emit("delete", message);
  // }

  // socket.on("delete", function(deletedMessage) {
  //   $rootScope.$applyAsync(function() {
  //     var index = self.all.findIndex(function(message) {
  //       return message._id === deletedMessage._id;
  //     });

  //     if(index > -1) {
  //       self.all.splice(index, 1);
  //     }
  //   });
  // });

  // $rootScope.$on("currentRoom", function(event, room) {
  //   if(room) {
  //     self.currentRoom = room;
  //     Message.query({ roomId: room._id }, function(res) {
  //       self.all = res;
  //     });
  //   }
  // });

  // this.send = function(event) {
  //   if(event.keyCode === 13 && !event.shiftKey) {
  //     socket.emit("message", { content: this.new, room: self.currentRoom });
  //     this.new = null;
  //   }
  // }

  // socket.on("message", function(data) {
  //   if(data.room._id === self.currentRoom._id) {
  //     $rootScope.$applyAsync(function() {
  //       var message = new Message(data);
  //       self.all.push(message);
  //     });
  //   }
  // });
}