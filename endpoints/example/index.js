const api = require('express').Router();

api.post('/', function(req, res, next) {
  // passport automatically exposes what you return in middleware to req.user
  // currently sending the jwt payload to be accessible from req.user
  res.send(req.user);
});

module.exports = api;