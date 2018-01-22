var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var auth = require('./routes/admin/auth')(passport);
var kota = require('./routes/admin/kota');
var cabang = require('./routes/admin/cabang');
var rute = require('./routes/admin/rute');
var supir = require('./routes/admin/supir');
var jadwal = require('./routes/admin/jadwal');
var authAPI = require('./routes/api/auth')(passport);
var databases = require("./config/db");

var app = express();

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'lalalalalalalalalalalla',cookie: { maxAge: 600000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routing
app.use('/admin', auth);
app.use('/admin/kota', kota);
app.use('/admin/cabang', cabang);
app.use('/admin/rute', rute);
app.use('/admin/supir', supir);
app.use('/admin/jadwal', jadwal);

app.use('/api', authAPI);

databases.mysql.sync({force: false}).then(() => {
  console.log('Database Ready');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
