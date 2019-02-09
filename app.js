//imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes/index.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'pug');

//routes
app.use('/', routes);
app.use('/login', routes);
app.use('/setting', routes);
app.use('/profile', routes);
app.use('/play', routes);


// listen on port 3000
app.listen(3000, function() {
  console.log('Express app listening on port 3000');
});
