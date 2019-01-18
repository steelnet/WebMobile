var express=require("express");
var app=express();
app.listen(8000);
console.log("Express Web server is starting at port:8000");
app.get('/',function(req,res)
        {res.send('Hello!, this is from express Web Server.');});