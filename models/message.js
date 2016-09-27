var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  room: { type: mongoose.Schema.ObjectId, ref: 'Room' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

// messageSchema.pre('save', function(next) {
//   var doc = this;
//   doc.model('Room')
//     .findById(this.room)
//     .then(function(room) {
//       if(room.messages.indexOf(doc._id) === -1) {
//         room.messages.push(doc._id);
//         return room.save(next);
//       }
//       next();
//     });
// });

// messageSchema.pre('save', function(next) {
//   var doc = this;
//   doc.model('User')
//     .findById(this.user)
//     .then(function(user) {
//       if(user.messages.indexOf(doc._id) === -1) {
//         user.messages.push(doc._id);
//         return user.save(next);
//       }
//       next();
//     });
// });

messageSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Message', messageSchema);