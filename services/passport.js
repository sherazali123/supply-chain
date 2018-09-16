const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email, password, done) => {
    User.findOne({ email })
        .then(user => {
            if(!user){
                return done(null, false, { errors: { 'email': 'We didn\'t find email address'  } });
            }
            if(!user.matchPassword(password)){
                return done(null, false, { errors: { 'password': 'Your password is incorrect'  } });
            }
            return done(null, user);
        })
        .catch(done);
}));