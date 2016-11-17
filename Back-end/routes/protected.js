var express = require("express");
var router = express.Router();
var passport = require('passport');
var pass = require("../config/pass");

router.get('/', pass.ensureAuthenticated, function(req, res) {
  res.send("access granted. secure stuff happens here");
});

module.exports = router;