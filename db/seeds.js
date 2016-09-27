var mongoose = require('mongoose');
var User = require('../models/user');
var Room = require('../models/room');
var Message = require('../models/message');
var bluebird = require('bluebird');

var databaseUri = require('../config/db')(process.env.NODE_ENV || "development");
mongoose.connect(databaseUri);
mongoose.Promise = bluebird;

User.collection.drop();
Room.collection.drop();
Message.collection.drop();

User.create([{
  name: "Mickyginger",
  email: "aaa@aaa.com",
  image: "Test"
}, {
  name: "Mick",
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
    name: "True music",
    image: "Test",
    users: [users[0],users[1], users[2], users[3]]
  },  {
    name: "Music fantasy",
    image: "Test",
    users: [users[0],users[1], users[2], users[3]]
  }], function(err, rooms) {
    if(!err) console.log("Rooms created!");
    Message.create([{
      content: "Hello World!",
      room: rooms[0],
      user: users[0]
    }, {
      content: "Hello World Again!",
      room: rooms[0],
      user: users[0]
    }], function(err, messages) {
      if(!err) console.log("Messages created!");
      mongoose.connection.close();
    });
  });
});
