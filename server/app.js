//require -- importuje
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//pripsani cors
const cors = require("cors");

//zajima nas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catsRouter = require('./routes/cats');
var carsRouter = require('./routes/cars');

//zajima nas
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//pripsasni cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//kopirovat ze stranky mongoosejs.com
const mongoose = require('mongoose');
mongoose
//mongodb+srv://<username>:<heslo>@cluster0.ncmc5t2.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0
//adresu najdeme na mongudb
.connect('mongodb+srv://admin:adminadmin@cluster0.ncmc5t2.mongodb.net/mat?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));


//zajima nas
app.use('/', indexRouter);
app.use('/users', usersRouter);
//http://localhost:3000/cats/
app.use('/cats', catsRouter);
app.use('/cars', carsRouter);

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
