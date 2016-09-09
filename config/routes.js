var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = require('./tokens').secret;

var oauthController = require('../controllers/oauth');
var authController = require('../controllers/auth');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Unauthorized" });

    req.user = payload;
    next();
  });
}


router.post('/oauth/facebook', oauthController.facebook);
router.post('/oauth/github', oauthController.github);
router.post('/login', authController.login);
router.post('/register', authController.register);


module.exports = router;

