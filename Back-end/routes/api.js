var express = require("express");
var router = express.Router();
var passport = require('passport');
var pass = require("../config/pass");
var db = require("../db");

// Main API route: will return error or user info
router.get('/', function(req, res) {
  var response = {
    "loggedIn": false
  }

  if (req.isAuthenticated()) {
    response = {
      "loggedIn": true,
      "name": req.user.name,
      "username": req.user.username,
      "avatar": req.user.avatar_url,
      "isRunning": req.user.isRunning
    }
  }

  res.json(response);
});

// Login route: will auth redirect to main route if user is already authenticated
router.get("/login", function(req, res){
  if(req.isAuthenticated()){
    res.redirect("/api");
  }else{
    res.redirect("/auth/github");
  }
});

// Logout route:
router.get("/logout", function(req, res){
  res.redirect("/logout");
});

// Post task route:
router.post("/stat", function(req, res){
  var stat = req.body;
  var startTime = stat.startTime;
  var endTime = stat.endTime;

  var response = {
    "succes": true
  }

  res.json(response);
});

// Stats route:
router.get("/stats", function(req, res){
  if(req.isAuthenticated()){
    db.getStats(req.user.userId, function(err, docs){
      res.json(docs);
    });

  }else{
    res.json({"msg": "You are not logged in"});
  }
});

// Change isRunning state
router.put("/running", function(req, res){
  var body = req.body;

  if(body.isRunning === req.user.isRunning){
    res.json({
      "isRunning": req.user.isRunning
    })
  }else{
    db.updateUser(req.user.userId, req.body.isRunning, function(err, doc){
      if(err) res.json({"error": err});

      req.session.passport.user.isRunning = doc.isRunning;
      res.json({
        "isRunning": doc.isRunning
      })
    });
  }
});



module.exports = router;