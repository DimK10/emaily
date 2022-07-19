const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passportConfig = require('./services/password');
const { mongoURI } = require('./config/keys');
require('./models/User.js');

mongoose.connect(mongoURI);

const app = express();

// Taken from 
// https://stackoverflow.com/questions/22298033/nodejs-passport-error-oauthstrategy-requires-session-support
// Authentication configuration
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'bla bla bla' 
}));

passportConfig(app);

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
