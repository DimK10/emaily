const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
require('./services/password');
const { mongoURI, cookieKey } = require('./config/keys');
const passport = require('passport');
require('./models/User.js');

mongoose.connect(mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
