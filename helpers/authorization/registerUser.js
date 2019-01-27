const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

passport.use('register-user', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false, {
          message: 'That username is already taken.'
        });
      }

      let newUser = new User();
      newUser.username = username;
      // save password for last, so we can asynchronously encrypt it
      newUser.encryptPassword(password)
      .then(password => {
        newUser.password = password;

        // save the new user
        return newUser.save();
      })
      .then(() => {
        return done(null, true, {
          message: 'User created successfully!'
        });
      })
      .catch(err => {
        return done(err);
      })
    });
  }
));