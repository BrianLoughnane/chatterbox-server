var http = require("http");
var handleRequest = require('./request-handler');
var urlParser = require('url');
var utils = require('./utils')

var port = 3000;
var ip = "127.0.0.1";
console.log("Listening on http://" + ip + ":" + port);

var routes = {
  '/classes/chatterbox': true,
  '/send': true
}

var server = http.createServer(function(request, response) {
  console.log(request.method + ' request made on ' + request.url)
  var parts = urlParser.parse(request.url);

  var route = routes[parts.pathname]
  if( route ) {
    handleRequest(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }

});

server.listen(port, ip);

