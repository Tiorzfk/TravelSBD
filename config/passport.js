var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var bcrypt = require('bcrypt');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id_user);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({where : {'id_user' : id} }).then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

          User.findOne({where : {'email' : email} }).then(user => {
              if (user) {
                  return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
              } else {
                  req.body.jenis_user = 'member';
                  req.body.password = bcrypt.hashSync(req.body.password, 10);
                  User.create(req.body).then(data => {
                    return done(null, data);
                  })
                  .catch(error => {
                    return done(error, null);
                  });
              }

          }).catch(error => {
            console.log(error);
              return done(error, null);
          });

        });

    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log(email);
        User.findOne({where : {'email' : email} }).then(user => {
            if (!user)
                return done(null, false, req.flash('loginMessage', 'User tidak ditemukan.'));

            if (!bcrypt.compareSync(req.body.password, user.password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        }).catch(err => {
            return done(err);
        });

    }));

};
