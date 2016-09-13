var mongoose = require('mongoose');
var s3 = require('../config/s3');

var roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message' }],
  image: { type: String },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

roomSchema.pre('save', function(next) {
  var doc = this;
    this.users.forEach(function(user) {
      doc.model('User')
        .findById(user)
        .then(function(user) {
          if(user.rooms.indexOf(doc._id) === -1) {
            user.rooms.push(doc._id);
            return user.save(next);
          }
          next();
        });
     })
});

// roomSchema.path('image')
//   .get(function(image) {
//     return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + image;
//   })
//   .set(function(image) {
//     return image.split('/').splice(-1)[0];
//   });

roomSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Room', roomSchema);
