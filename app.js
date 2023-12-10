var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors'); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const imsCrud=require('./IMS/ims');

var app = express();

// ---------------------------------------------------------------------
              // CORS 
// ---------------------------------------------------------------------

// Import the cors middleware

// Use the cors middleware with specific options
app.use(
  cors()
);
const corsOption={
    origin: 'http://localhost:3002', // Replace with the actual origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }
const port = 3001;

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------------------------------------------
              // CORS ENDS
// ---------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ims',imsCrud);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
