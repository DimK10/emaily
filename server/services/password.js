const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const {
  googleClientID: clientID,
  googleClientSecret: clientSecret,
} = require('../config/keys');
require('../models/User');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await new User({ googleId: profile.id }).save();
        }

        done(null, user);
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);
