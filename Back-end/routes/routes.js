var express = require("express");
var router = express.Router();
var passport = require('passport');
var protected = require("./protected");
var public = require("./public");
var api = require("./api");
var db = require("../db");
require("dotenv").config();

// Main route
router.get('/', function (req, res) {
  var html = "<ul>\
    <li><a href='/auth/github'>GitHub</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";

  // Dump the user for debugging
  if (req.isAuthenticated()) {
    html += "<p>authenticated as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  }

  res.send(html);
});

// Start the GitHub Login process
router.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {

    // Check if user is already added
    db.findUser(req.user._json.id, function(err, doc){
      if(err) return err;

      // If not: add user to db
      if(!doc){
        db.addUser(req.user._json, function(err, doc){
          if(err) return err;

          console.log("Following document is added", JSON.stringify(doc));
        });
      }else{
        console.log("User already exists");
      }
    });

    res.redirect('/');
  }
);

// Logout route
router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// Protected route
router.use("/protected", protected);

// public route
router.use("/public", public);

// API
router.use("/api", api);


module.exports = router;