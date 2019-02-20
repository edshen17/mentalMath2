'use strict'
const question = require('../static/question.js');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const middleware = require('../middleware');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

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
          highScore: user.highScore,
          totalPoints: user.totalPoints
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
      if (err) {
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
      password: req.body.password,
      highScore: 0,
      totalPoints: 0
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
  let questionArray;
  if (req.cookies['operation'] && req.cookies['min'] &&
    req.cookies['max'] && req.cookies['amount']) { //if there are cookies, use those values
    questionArray = question.createQuestions(req.cookies['operation'], req.cookies['min'],
      req.cookies['max'], req.cookies['amount']);
  } else {
    questionArray = question.createQuestions(); //otherwise, use default values
  }

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
    // set cookies for future use
    res.cookie('operation', req.body.radio);
    res.cookie('min', req.body.min);
    res.cookie('max', req.body.max);
    res.cookie('amount', req.body.amount);
    //console.log(req.cookies['operation']);
    const questionArray = question.createQuestions(req.body.radio, req.body.min, req.body.max, req.body.amount);
    return res.render('play', {
      questions: questionArray,
      score: 0,
      operation: req.body.radio
    });
  } else {
    const err = new Error('Please fill out all fields.');
    err.status = 401;
    next(err);
  }
});

// POST /score
// Route for updating user scores
router.post('/score', (req, res) => {
  if (req.session && req.session.userId) { // if logged in
    User.findById(req.session.userId, function(err, user) { //find user
      if (err) {
        return next(err);
      } else { //update points and high score
        user.totalPoints += 1;
        user.changeHighScore(parseInt(req.body.score), function(err, result) {
          if (err) return next(err);
        });
      }
    });
  }
  // always send a response:
  res.json({
    ok: true
  });
});

// GET /scoreboard
// Route for player scoreboard
router.get('/scoreboard', function(req, res, next) {
  User.find((err, users) => {
    if (err) return next(err);
    if (users != null) {
      return res.render('scoreboard', {
        title: 'Scoreboard',
        users: users
      });
    }
  }).select("-_id username totalPoints highScore").sort([
    ['totalPoints', 'desc']
  ]).limit(50);


});

module.exports = router;
