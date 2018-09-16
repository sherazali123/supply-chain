// index.js
// Author: Sheraz Ali
// Date: 16/09/2018

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// mongoURI is created from mlab.com with sheraz1234 account
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });


const app = express();

// middlewares
app.use(bodyParser.json());

// models
require('./models/User');

// authentication
require('./services/passport');

//routes
require('./routes/authRoutes')(app);

app.listen(process.env.PORT || 5000);
