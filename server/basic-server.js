var http = require("http");
var handleRequest = require('./request-handler');
var data = [{username: 'brian', text: 'hello karianne'}];

var port = 3000;
var ip = "127.0.0.1";
console.log("Listening on http://" + ip + ":" + port);



console.log(handleRequest);
var server = http.createServer(handleRequest);
server.listen(port, ip);

