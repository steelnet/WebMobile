var express=require('express');
var app=express();
var ejs=require("ejs");
app.listen(8000);
console.log("Express server is starting at:8000");
app.set('views','./views');
app.set('view engine','ejs');
app.get('/',function(req,res){
        res.render('temp.ejs',{'username':'Joe Zhou','password':'12345'});
        });
