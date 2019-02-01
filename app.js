//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

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
  return res.render('play', { title: 'Game' });
});

app.post('/play', function(req, res, next) {
  if (req.body.amount && req.body.min && req.body.max) {
    const question = {
      num1: Math.floor(Math.random() * req.body.max, 10 - req.body.min + req.body.min), //refactor into a function!
      num2: Math.floor(Math.random() * req.body.max, 10 - req.body.min + req.body.min),
      get answer () {
        return this.num1 + this.num2;
      },
      get voice() {
        return `${this.num1} + ${this.num2} is`
      },
      operation: "+" //placeholder for now
    };

    console.dir(question);
    console.log(question.answer, question.voice);
    return res.render('play', { title: 'Game' });

  }
});



// listen on port 3000
app.listen(3000, function() {
  console.log('Express app listening on port 3000');
});
