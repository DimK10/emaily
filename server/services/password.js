const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const {
  googleClientID: clientID,
  googleClientSecret: clientSecret,
} = require('../config/keys');
require('../models/User');

module.exports = passportConfig = (app) => {
  const User = mongoose.model('users');

  // Passport
  // Taken from
  // https://stackoverflow.com/questions/22298033/nodejs-passport-error-oauthstrategy-requires-session-support
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
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
};
