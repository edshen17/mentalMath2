//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const game = require('./static/game.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'pug');

// include routes
// var routes = require('./routes/index');
// app.use('/', routes) ;
app.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

app.get('/login', function(req, res, next) {
  return res.render('index', { title: 'Login' });
});

app.get('/setting', function(req, res, next) {
  return res.render('setting', { title: 'Settings' });
});

app.get('/profile', function(req, res, next) {
  return res.render('index', { title: 'Profile' });
});

app.get('/play', function(req, res, next) {
  const questionArray = game.createQuestions(); //use default values
  return res.render('play', { title: 'Game', questions: questionArray, score: 0, operation: req.body.radio});
});

app.post('/play', function(req, res, next) {
  if (req.body.amount && req.body.min && req.body.max) {
    const questionArray = game.createQuestions(req.body.radio, req.body.min, req.body.max, req.body.amount);
    return res.render('play', { questions: questionArray, score: 0, operation: req.body.radio});
  }
});


// listen on port 3000
app.listen(3000, function() {
  console.log('Express app listening on port 3000');
});
