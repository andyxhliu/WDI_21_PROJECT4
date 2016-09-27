var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = require('./tokens').secret;
var upload = require('./upload');

var usersController = require('../controllers/users');
var oauthController = require('../controllers/oauth');
var roomsController = require('../controllers/rooms');
var authController = require('../controllers/auth');
var messagesController = require('../controllers/messages');


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

router.route('/users')
  .get(usersController.index);

router.route('/rooms')
  .get(roomsController.index)
  .post(secureRoute, roomsController.create);

router.route('/rooms/:id')
  .get(roomsController.show)
  .put(secureRoute, roomsController.update)
  .delete(secureRoute, roomsController.delete);

router.route('/messages/:roomId')
  .get(messagesController.index)
  .post(messagesController.create);

router.route('/messages/:id')
  .all(secureRoute)
  .delete(messagesController.delete);

module.exports = router;

