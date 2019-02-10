//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
const routes = require('./routes/index.js');
const app = express();

// sessions for logins
app.use(session({secret: 'your secret', saveUninitialized: false, resave: true}));
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/users');
const db = mongoose.connection;

// on mongo error
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'pug');

// routes
app.use('/', routes);
app.use('/login', routes);
app.use('/setting', routes);
app.use('/profile', routes);
app.use('register', routes);
app.use('/play', routes);

// 404 error
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// listen on port 3000
app.listen(3000, function() {
  console.log('Express app listening on port 3000');
});
