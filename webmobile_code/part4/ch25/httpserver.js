var http=require("http");
function http_Server(req,res){
    var content="connection to server!";
    content_Len=content.length;
    res.writeHead(200,{'content_Length':content_Len,
                        'content_Type':'text/plain'});
    res.end(content);
}
http.createServer(http_Server).listen(8000);
console.log("Server is starting at port:8000");