var express = require("express");
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.send("Public: access for everyone");
});

module.exports = router;