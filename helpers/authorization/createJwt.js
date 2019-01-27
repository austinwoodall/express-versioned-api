const jwt = require('jsonwebtoken');

var opts = {
  issuer: 'resource.shatteredrealms.rocks',
  audience: 'shatteredrealms.rocks',
  expiresIn: '24h'
};

module.exports = function createJwt(payload) {
  return new Promise(
    (resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET, opts, function(err, token) {
        if (err) {
          reject(err);
        }

        resolve(token);
      })
    }
  )
}