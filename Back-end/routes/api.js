var express = require("express");
var router = express.Router();
var passport = require('passport');
var pass = require("../config/pass");

router.get('/', function(req, res) {
  var response = {"error": "API not ready."};
  res.json(response);
});

module.exports = router;