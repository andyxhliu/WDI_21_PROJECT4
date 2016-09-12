var mongoose = require('mongoose');
var User = require('../models/user');
var Room = require('../models/room');
var bluebird = require('bluebird');

var databaseUri = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);
mongoose.Promise = bluebird;

User.collection.drop();
Room.collection.drop();

User.create([{
  name: "Paul Verhoeven",
  email: "aaa@aaa.com",
  image: "Test"
}, {
  name: "Uwe Boll",
  email: "bbb@bbb.com",
  image: "Test"
}, {
  name: "Xianghua Liu",
  email: "ccc@ccc.com",
  image: "Test"
}, {
  name: "Ben Bowlers",
  email: "ddd@ddd.com",
  image: "Test"
}], function(err, users) {
  if(!err) console.log("Users created!");
  Room.create([{
    name: "Robocop",
    image: "Test",
    users: [users[0],users[1], users[2], users[3]]
  },  {
    name: "Bloodrayne",
    image: "Test",
    users: [users[0],users[1], users[2], users[3]]
  }], function(err, rooms) {
    if(!err) console.log("Rooms created!");
    mongoose.connection.close();
  });

});
