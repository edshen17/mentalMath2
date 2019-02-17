//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/index.js');
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;

// on mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// sessions for logins
app.use(session({
  secret: 'top secret!',
  saveUninitialized: false,
  resave: true,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// make user ID available in pug templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}));
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
