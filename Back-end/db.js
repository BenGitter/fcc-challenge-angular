// Require mongodb and set database to null
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var database = null;

exports.connect = function(url, done){
  if(database) return done();

  MongoClient.connect(url, function(err, db){
    if(err) return done(err);

    database = db;
    done();
  });
}

exports.findUser = function(userId, callback){
  var users = database.collection("users");
  users.findOne({
    userId: userId
  }, function(err, doc){
    if(err) callback(err);

    return callback(null, doc);
  });
}

exports.addUser = function(user, callback){
  var users = database.collection("users");
  users.insertOne({
    userId: user.id,
    isRunning: false,
  }, function(err, doc){
    if(err) callback(err);
    
    return callback(null, doc);
  })
}

exports.getStats = function(userId, callback){
  var items = database.collection("items");

  items.find({
    userId: parseInt(userId)
  }).toArray(function(err, docs){
    if(err) return callback(err);

    return callback(null, docs);
  });
}

exports.updateUser = function(userId, isRunning, callback){
  var users = database.collection("users");
  users.update({
    userId: userId
  }, {
    isRunning: isRunning
  }, function(err, doc){
    if(err) return callback(err);

    callback(null, doc);
  });
}