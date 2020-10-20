var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create application/json parser
var jsonParser = bodyParser.json()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* Who wants a slice? */
const escape_string = unsafe => JSON.stringify(unsafe).slice(1, -1)
    .replace(/</g, '\\x3C').replace(/>/g, '\\x3E');


// POST /login gets urlencoded bodies
app.post('/note', function (req, res) {

  /* Who wants a slice? */
  //const escape_string = unsafe => JSON.stringify(unsafe).slice(1, -1)
  //    .replace(/</g, '\\x3C').replace(/>/g, '\\x3E');
  const note = req.body.content;
  console.log("Value of req body is " + JSON.stringify(req.body));

  const unsafe_content = note.content;
  const safe_content = escape_string(unsafe_content);

  res.send('Original Note     == ' + note);
  res.send('safe_content Note ==: ' + safe_content);


})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
