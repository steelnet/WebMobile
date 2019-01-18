var mongoose = require('mongoose');  
mongoose.Promise = global.Promise; 
var uri='mongodb://localhost:27017/mydb';
//mongoose.connect(url,{useMongoClient:true}); 
var db = mongoose.connection;
db.openUri(uri);
db.on('error', console.error.bind(console, 'connected error!'));
db.once('open', function() {console.log('conected!');})
var User=require("./module/user.js");
var user1 = new User({
        user_id:'004',
        username : 'Jerry li',                
        password: 'nooon',                                     
    });
user1.save(function (err, result) {
    if (err) {console.log("Save Error:" + err);}
     else {console.log("Save Result:" + result);}
    });
User.find(function (err, result) {
        if (err) {console.log("Find Error:" + err);}
        else {console.log("Find Result:" + result);}
    });