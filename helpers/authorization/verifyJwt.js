const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user');

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = 'resource.shatteredrealms.rocks';
opts.audience = 'shatteredrealms.rocks';

passport.use(new JwtStrategy(opts, function(payload, done) {
  if (!payload) {
    return done(null, false);
  }

  if (payload) {
    return done(null, payload);
  }
}));