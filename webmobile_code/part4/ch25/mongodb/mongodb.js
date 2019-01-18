var mongodb = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/mydb';
//data
var myusers=[ {
    user_id: '001',
    name: 'joe zhou',
    password: '12345' },
    {
    user_id: '002',
    name: 'Mark zhang',
    password: '11111' } ];
// connect to the server
mongodb.connect(url, function(err, db) {
 if(!err){
     console.log("Connected successfully to mongodb");
   findDoc(db,function(data){
    if (data.length==0)
        insertDoc(db, function(result){console.log(result);db.close();});
    else {console.log(data);db.close();}});}});
     
//insert data
var insertDoc = function(db, callback){
    db.collection('users').insertMany(myusers,function(err,result){
        console.log("Inserted!");
        callback(result);
    });};
//find data
var findDoc = function(db,callback){
    db.collection('users').find({}).toArray(function(err,data){
        if(!err)
        console.log("Found:")
        callback(data);
    });};