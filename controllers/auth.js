var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secret = require('../config/tokens').secret;

function login(req, res) {
  console.log("In controllers auth login");
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) res.send(500).json(err);
    if(!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    var payload = { _id: user._id, name: user.name };
    var token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: "Login successful!",
      token: token
    });
  });
}

function register(req, res) {
  console.log("In controllers auth register");
  User.create(req.body, function(err, user) {
    if(err) return res.status(400).json(err);

    var payload = { _id: user._id, name: user.name };
    var token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: "Thanks for registering!",
      token: token
    });
  });
}

module.exports = {
  login: login,
  register: register
}