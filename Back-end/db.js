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
  collection = database.collection("users");
  collection.findOne({
    userId: userId
  }, function(err, doc){
    if(err) callback(err);

    return callback(null, doc);
  });
}

exports.addUser = function(user, callback){
  collection = database.collection("users");
  collection.insertOne({
    userId: user.id,
    isRunning: false,
  }, function(err, doc){
    if(err) callback(err);
    
    return callback(null, doc);
  })
}