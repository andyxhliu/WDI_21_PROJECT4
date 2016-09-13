var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// var s3 = require('../config/s3');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profileImage: String,
  facebookId: String,
  githubId: String,
  passwordHash: String,
  messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message'}],
  rooms: [{ type: mongoose.Schema.ObjectId, ref: 'Room'}]
});

// userSchema.path('profileImage')
//   .get(function(profileImage) {
//     return s3.endpoint.href + process.env.AWS_BUCKET_NAME + "/" + profileImage;
//   })
//   .set(function(profileImage) {
//     return profileImage.split('/').splice(-1)[0];
//   });


userSchema.virtual('password')
  .set(function(password) {
    // save on the object, in case we need it later
    this._password = password;

    // hash the password and save on the passwordHash property
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

userSchema.virtual('passwordConfirmation')
  .get(function() {
    return this._passwordConfirmation;
  })
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('passwordHash')
  .validate(function(passwordHash) {
    if(this.isNew) {
      if(!this._password) {
        // If there was no password sent from the client
        return this.invalidate('password', 'A password is required');
      }

      if(this._password !== this._passwordConfirmation) {
        // If the password and passwordConfirmation does not match
        return this.invalidate('passwordConfirmation', 'Passwords do not match');
      }
    }
  });


userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('User', userSchema);