const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  highScore: {
    type: Number,
    required: false,
    default: 0
  },

  totalPoints: {
    type: Number,
    required: false,
    default: 0
  }
});

// user authentication
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

// error handler
UserSchema.on('index', function(err){
  if (err) {
    console.error(err);
  }
});

// updates the high score
UserSchema.method('changeHighScore', function(newScore, callback) {
  if (newScore > this.highScore) {
    this.highScore = newScore;
  }
  this.save(callback);
});


// hash password first, then save it in the database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
