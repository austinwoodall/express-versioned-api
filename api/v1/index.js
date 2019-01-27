const api = require('express').Router();
const passport = require('passport');
const registerRoutes = require('../../endpoints/register');
const loginRoutes = require('../../endpoints/login');

// example route
const exampleRoutes = require('../../endpoints/example');
// required to pass in JWT authentication with passport
require('../../helpers/authorization/verifyJwt');

api.use('/register', registerRoutes);
api.use('/login', loginRoutes);
// example of using passport and jwt
api.use('/example', [
  passport.authenticate('jwt', {session: false}),
  exampleRoutes
])

module.exports = api;
