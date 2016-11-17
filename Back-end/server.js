// Require stuff
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var routes = require("./routes/routes");
var db = require("./db");
var port = process.env.PORT || 30000;

var app = express();

// Initialize session and passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "super-secret-key"}));
app.use(passport.initialize());
app.use(passport.session());


// Router
app.use("/", routes);

// Start MongoDB
db.connect(process.env.DB_URL, function(err){
  if(err){
    console.log("Unable to connect to MongoDB");
    process.exit(1);
  }else{
    // Start server
    app.listen(port, function(){
      console.log("App listening on port", port);
    });
  }
});

