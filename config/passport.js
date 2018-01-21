var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

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

            // if (!user.validPassword(password))
            //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            return done(null, user);
        }).catch(err => {
            return done(err);
        });

    }));

};
