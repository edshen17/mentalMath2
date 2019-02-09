'use strict'
const question = require('../static/question.js');
const express = require('express');
const router = express.Router();

// GET /
// Route for index page
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /login
// Route for login page
router.get('/login', function(req, res, next) {
  return res.render('index', { title: 'Login' });
});

// GET /setting
// Route for settings page
router.get('/setting', function(req, res, next) {
  return res.render('setting', { title: 'Settings' });
});

// GET /profile
// Route for profile page
router.get('/profile', function(req, res, next) {
  return res.render('index', { title: 'Profile' });
});

// GET /play
// Route for game
router.get('/play', function(req, res, next) {
  const questionArray = question.createQuestions(); //use default values if none inputted
  return res.render('play', { title: 'Game', questions: questionArray, score: 0, operation: req.body.radio});
});

// POST /play
// Route for creating the game from setting route
router.post('/play', function(req, res, next) {
  if (req.body.amount && req.body.min && req.body.max) {
    const questionArray = question.createQuestions(req.body.radio, req.body.min, req.body.max, req.body.amount);
    return res.render('play', { questions: questionArray, score: 0, operation: req.body.radio});
  }
});

module.exports = router;
