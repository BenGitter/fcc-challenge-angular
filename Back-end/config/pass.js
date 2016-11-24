var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
require("dotenv").config();

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors

  var _user = {
    "userId": user._json.id,
    "name": user._json.name,
    "username": user.username,
    "avatar_url": user._json.avatar_url,
    "isRunning": "false"
  }
  done(null, _user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}