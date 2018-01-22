var express = require('express');
var router = express.Router();
var Reservasi = require('../../models/reservasi');
var Jadwal = require('../../models/jadwal');
var User = require('../../models/user');
var Rute = require('../../models/rute');
var Cabang = require('../../models/cabang');
var Kota = require('../../models/kota');

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
      return next();

  res.redirect('/admin/login');
}

module.exports = function(passport) {

  router.get('/login', function(req, res, next) {
    res.render('admin/login', { message: req.flash('loginMessage')[0] });
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/admin/dashboard',
    failureRedirect : '/admin/login',
    failureFlash : true
  }));

  router.get('/dashboard', isLoggedIn, function(req, res, next) {
    if(req.user.jenis_user == 'fo') {
      Reservasi.findAll(
        {
          include: [{
            model : Jadwal,
            include : [{
              model : Rute,
              include : [{
                model : Cabang,
                as : 'cabangAsal',
                include : [Kota]
              },{
                model : Cabang,
                as : 'cabangTujuan',
                include : [Kota]
              }]
            }]
          }, {
            model : User
          }]
        }
      ).then(data => {
          res.render('admin/index', {data:data,user : req.user,message: req.flash('message')});
      }).catch(error => {
          req.flash('message', error);
          res.redirect('/admin/dashboard');
      });
    }else{
      res.render('admin/index', {user : req.user,message: req.flash('message')});
    }
  });

  router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/admin/login');
  });

  return router;
}
