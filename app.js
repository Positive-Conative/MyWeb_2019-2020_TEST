var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var programmingRouter = require('./routes/programming');
var guestRouter = require('./routes/guest');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/programming', programmingRouter);
app.use('/guest', guestRouter);
app.use('/test', testRouter);

//mongoose
mongoose.Promise = global.Promise;
const connStr = 'mongodb://conative:kyj123@cluster0-shard-00-00-kapxb.mongodb.net:27017,cluster0-shard-00-01-kapxb.mongodb.net:27017,cluster0-shard-00-02-kapxb.mongodb.net:27017/first?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connStr, {useNewUrlParser: true});
mongoose.connection.on('error', console.error);

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
