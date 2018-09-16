// index.js
// Author: Sheraz Ali
// Date: 16/09/2018

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');

// mongoURI is created from mlab.com with sheraz1234 account
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection opened');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
});


const app = express();

// middlewares
app.use(bodyParser.json());


// models
require('./models/User');

// authentication
require('./services/passport');

// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/authRoutes')(app);

app.listen(process.env.PORT || 5000);
