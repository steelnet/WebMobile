var express = require('express');
var app = express();
//var cors = require('cors'); //处理跨域请求的
var path=require("path");
var bodyParser = require('body-parser');
var myRoute=require("./control/routes.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user',myRoute);
app.use("/",express.static(path.join(__dirname,"public")));
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.Promise = global.Promise; 
db.openUri('mongodb://localhost/mydb');
db.on('error', console.error.bind(console, 'connected error!'));
db.once('open', function() {console.log('conected!');})
app.listen(8000); 