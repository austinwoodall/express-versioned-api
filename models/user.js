const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

userSchema.methods.encryptPassword = function(password) {
  return new Promise(
    (resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          reject(err);
        }

        bcrypt.hash(password, salt, null, function(err, hashedPassword) {
          if (err) {
            reject(err);
          }

          resolve(hashedPassword);
        })
      })
    }
  )
}

userSchema.methods.comparePassword = function(password) {
  return new Promise(
    (resolve, reject) => {
      bcrypt.compare(password, this.password, function(err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
      })
    }
  )
}

module.exports = mongoose.model('User', userSchema);