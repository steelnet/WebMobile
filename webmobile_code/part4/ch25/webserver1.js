var http=require("http");
var fs=require("fs");
var url=require("url");
function serveFiles(res,path,contentType){
	fs.readFile(path, getFile);
    function getFile(err,data){
            if(err){
                res.writeHead(500,{'content_Type':'text/plain'});
                res.end('500-internal Error!');}
            else {
               res.writeHead(200,{'content_Type':contentType});
               res.end(data);};  };
    }
function http_Server(req,res){
    var getUrl=req.url;
    var path=url.parse(getUrl).path;
    console.log(path);
    switch (path) {
            case '/www/home.html':
                serveFiles(res,'www/home.html','text/html');
                break;
            case '/imgs/qq_logo.png':
                 serveFiles(res,'imgs/qq_logo.png','text/png');
                break;
            case '/www/about.html':
                 serveFiles(res,'www/about.html','text/html');
                break;
			default:
               serveFiles(res,'www/404.html','text/html');
                break;
            }
  
};
http.createServer(http_Server).listen(8000);
console.log("Server is starting at port:8000");