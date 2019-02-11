'use strict'
const question = require('../static/question.js');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const middleware = require('../middleware');

// GET /profile
// Route for profile page
router.get('/profile', middleware.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('profile', {
          title: 'Profile',
          username: user.username,
          highscore: user.highscore
        });
      }
    });
});

// GET /logout
// Logs user out
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete the session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


// GET /
// Route for index page
router.get('/', function(req, res, next) {
  return res.render('index', {
    title: 'Home'
  });
});

// GET /setting
// Route for settings page
router.get('/setting', function(req, res, next) {
  return res.render('setting', {
    title: 'Settings'
  });
});

// GET /register
// Route for register page
router.get('/register', middleware.loggedOut, function(req, res, next) {
  return res.render('register', {
    title: 'Register'
  });
});

// POST /register
// Route for register page
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.confirmPassword) {
    // if passwords don't match
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match.')
      err.status = 400;
      return next(err);
    }

    // create user object from input
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    User.create(userData, function(err, user) {
      if (err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else {
    const err = new Error('Please fill in all fields.');
    err.status = 400;
    return next(err);
  }
});

// GET /login
// Route for login page
router.get('/login', middleware.loggedOut, function(req, res, next) {
  return res.render('login', {
    title: 'Log in'
  });
});

// POST /login
// Route for when login information is submitted
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    const err = new Error('Please input an email and password.');
    err.status = 401;
    next(err);
  }
});

// GET /play
// Route for game
router.get('/play', function(req, res, next) {
  const questionArray = question.createQuestions(); //use default values if none inputted
  return res.render('play', {
    title: 'Game',
    questions: questionArray,
    score: 0,
    operation: req.body.radio
  });
});

// POST /play
// Route for creating the game from setting route
router.post('/play', function(req, res, next) {
  if (req.body.amount && req.body.min && req.body.max) {
    const questionArray = question.createQuestions(req.body.radio, req.body.min, req.body.max, req.body.amount);
    return res.render('play', {
      questions: questionArray,
      score: 0,
      operation: req.body.radio
    });
  }
});

module.exports = router;
