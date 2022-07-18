const express = require('express');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const {
  googleClientID: clientID,
  googleClientSecret: clientSecret,
} = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token: ', accessToken);
      console.log('refresh token: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
