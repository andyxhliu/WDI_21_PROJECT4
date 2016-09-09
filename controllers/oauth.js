var request = require('request-promise');
var qs = require('qs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var secret = require('../config/tokens').secret;

//Following is to authenticate facebook
function facebook(req, res) {
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_API_SECRET,
    redirect_uri: "http://localhost:3000/"
  };
  var userProfile;
  request
    .get({
      url: 'https://graph.facebook.com/v2.5/oauth/access_token',
      qs: params,
      json: true
    })
    .then(function(accessToken){
      return request.get({
        url: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture',
        qs: accessToken,
        json: true
      });
    })
    .then(function(profile) {
      return User.findOne({ facebookId: profile.id })
        .then(function(user) {
          if(user) {
            user.profileImage = profile.picture.data.url
          }
          else {
            user = new User({
              facebookId: profile.id,
              name: profile.name,
              profileImage: profile.picture.data.url,
              email: profile.picture.email
            });
          }
          console.log("here are the user details", user);
          return user.save();
        })
    })
    .then(function(user) {
      var payload = { _id: user._id, name: user.name, profileImage: user.profileImage };
      var token = jwt.sign(payload, secret, { expiresIn: '24h' });
      res.status(200).json({ token: token });
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
}

//Following is to authenticate github
function github(req, res) {
  request.post({
    url: "https://github.com/login/oauth/access_token",
    qs: {
      client_id: process.env.GITHUB_API_KEY,
      client_secret: process.env.GITHUB_API_SECRET,
      code: req.body.code,
    },
    json: true
  })
  .then(function(response){
    return request.get({
      url: "https://api.github.com/user",
      qs: { access_token: response.access_token },
      headers: { 'User-Agent': 'Request-Promise' }
    });
  })
  .then(function(profile) {
    return User.findOne({ email: profile.email })
      .then(function(user) {
        if(user) {
          user.githubId = profile.id;
          user.profileImage = profile.avatar_url;
        }
        else {
          // if not, create a new user
          user = new User({
            name: profile.login,
            email: profile.email,
            githubId: profile.id,
            profileImage: profile.avatar_url
          });
        }
        return user.save();
      })
  })
  .then(function(user) {
    var payload = {
      _id: user._id,
      profileImage: user.profileImage,
      name: user.username
    };
    var token = jwt.sign(payload, secret, { expiresIn: '24h' });
    res.status(200).json({ token: token });
  });

}

module.exports = {
  facebook: facebook,
  github: github
}