const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const existing = await User.findOne({ googleId: profile.id });
  if (existing) return done(null, existing);

  const newUser = await User.create({
    username: profile.displayName,
    googleId: profile.id,
    email: profile.emails[0].value
  });
  done(null, newUser);
}));
