// authRoutes.js
// Author: Sheraz Ali
// Date: 16/09/2018

const passport = require('passport');
const keys = require('../config/keys');

module.exports = app => {

    app.post('/api/' + keys.apiVersion + '/auth/login', passport.authenticate('local'), (req, res) => {
        res.send({user: req.user.filter(['password'])});
    });

    app.get('/api/' + keys.apiVersion + '/auth/logout', (req, res) => {
        res.send({action: 'logout'});
    });

    app.get('/api/' + keys.apiVersion + '/current_user', (req, res) => {
        res.send(req.user);
    });

};