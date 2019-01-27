const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const createJwt = require('../../helpers/authorization/createJwt');

passport.use('login-user', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          error: 'Invalid username or password.'
        });
      }

      user.comparePassword(password)
      .then(valid => {
        if (!valid) {
          throw 'Invalid username or password.';
        }

        return createJwt({
          id: user.id
        });
      })
      .then(token => {
        return done(null, true, {
          token: token
        })
      })
      .catch(err => {
        return done(err);
      })
    });
  }
));