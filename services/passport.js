const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = mongoose.model('users');

// serialize user to help passport to set cookie on client
passport.serializeUser((user, done) => {
    // user serialized user as mongo id
    done(null, user.id);
});

// deserialize user from the id (serialized user)
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

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