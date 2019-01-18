var express=require("express");
var app=express();
var bodyParser = require('body-parser'); //中间件,例如：bodyParser.json()
app.listen(8000);
console.log("Express Web server is starting at port:8000");
//Route start from here
app.use('/imgs',express.static("imgs"));
app.get('/',function(req,res)
        {res.send('Hello!, this is from get().');});
app.get('/home',function(req,res)
        {res.sendFile('www/expresshome.html',{root: __dirname},function(err)
         {if (err) {console.log('err');} else {console.log('success');}});});
app.post('/login',bodyParser.urlencoded({ extended: false }),function(req,res)
        {res.send('Hello!this is from post(). userid:'+req.query.id+'username:'
                  +req.body.username+':password:'+req.body.password);}); 
app.use('/json',bodyParser.urlencoded({ extended: false }),function(req,res)
        {req.body.id=req.query.id;
        //res.send(JSON.stringify(req.body,null,4));
        app.set('json spaces',4);res.json(req.body);}); 
app.all('*',function(req,res)
        {res.send('Hello!, this is from all().');});
