const api = require('express').Router();
const passport = require('passport');
require('../../helpers/authorization/registerUser');

api.post('/', function(req, res, next) {
  passport.authenticate('register-user', { session: false }, function(err, user, info) {
    if (err) {
      res.send(err);
    }

    if (!user) {
      res.json(info);
    }

    res.json(info);
  })(req, res, next);
});

module.exports = api;