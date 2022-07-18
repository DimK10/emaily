const express = require('express');
const mongoose = require('mongoose');
require('./services/password');
const { mongoURI } = require('./config/keys');
require('./models/User.js');

mongoose.connect(mongoURI);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
