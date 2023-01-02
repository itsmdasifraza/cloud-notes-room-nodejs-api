var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const connectMongo = require('./database');
var cors = require('cors');

const port =  process.env.PORT || '3000';

var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var noteRouter = require('./routes/note/note.route');
var listRouter = require('./routes/list/list.route');
var userRouter = require('./routes/user');
var profileRouter = require('./routes/profile');
var verifyEmailRouter = require('./routes/verify-email');
var forgotPasswordRouter = require('./routes/forgot-password');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// app.use(cors({
//   origin: "http://127.0.0.7:4200",
//   credentials: true
// }))

app.use('/api/auth/register', registerRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/note', noteRouter);
app.use('/api/list', listRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/verify/email', verifyEmailRouter);
app.use('/api/forgot/password', forgotPasswordRouter);

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;
