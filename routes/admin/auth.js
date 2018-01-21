var express = require('express');
var router = express.Router();

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    res.send('asd');
  });

  router.get('/login', function(req, res, next) {
    res.render('admin/login', { message: req.flash('loginMessage')[0] });
  });

  router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/admin/dashboard',
          failureRedirect : '/admin/login',
          failureFlash : true
      }));

  router.get('/dashboard', isLoggedIn, function(req, res, next) {
    res.render('admin/index', {user : req.user});
  });

  return router;
}
