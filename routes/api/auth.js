var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  router.get('/login', function(req, res, next) {
    res.render('admin/login', { message: req.flash('loginMessage')[0] });
  });

  router.post('/login', passport.authenticate('local-login', {
          successRedirect : '/api/success',
          failureRedirect : '/api/fail',
          failureFlash : true
      }));

  router.get('/success', function(req, res, next) {
    res.json({status:200,message:'success',result:req.user});
  });

  router.get('/fail', function(req, res, next) {
    res.json({status:400,message:req.flash('loginMessage')[0],result:[]});
  });

  router.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/api/success',
    failureRedirect : '/api/fail',
    failureFlash : true
  }));

  return router;
}
