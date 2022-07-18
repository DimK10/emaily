const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const {
  googleClientID: clientID,
  googleClientSecret: clientSecret,
} = require('../config/keys');

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
