var express=require("express");
var app=express();
app.use('/',express.static('./'))
    .use('/css',express.static('./css'))
    .use('/images',express.static('./images'))
    .use('/js',express.static('./js'))
    .use('/js/libs',express.static('./js/libs'))
;
console.log("server is starting");
app.listen(8000);