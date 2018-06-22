var http = require("http");
var fs = require("fs");
 
http.createServer(function(request, response){

	var filePath = request.url.substr(1);
	if(filePath == "") filePath ="index.html";
    fs.readFile(filePath, function(error, data){
                 
		if(error){
			response.statusCode = 404;
			response.end("Not Found");
		}   
		else{
			response.end(data);
		}
		return;
	})
}).listen(3000, function(){
    console.log("Сервер запущен по адресу http://localhost:3000/");
});