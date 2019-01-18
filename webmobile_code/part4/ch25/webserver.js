var http=require("http");
var fs=require("fs");
function http_Server(req,res){
   fs.readFile('www/index.html',get_File);
   function get_File(err,data){
            if(err){
                res.writeHead(500,{'content_Type':'text/plain'});
                res.end('500-internal Error!');}
            else {
               res.writeHead(200,{'content_Type':'text/html'});
               res.end(data);};  };
};
http.createServer(http_Server).listen(8000);
console.log("Server is starting at port:8000");