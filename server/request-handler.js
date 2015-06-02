var data = {
  results: [{username: 'brian', text: 'yolo', time: 1433202049000}]
}

var requestHandler = function(request, response) {
  debugger
  if(request.method === 'GET') {
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    // You will need to change this if you are sending something other than plain text, like JSON or HTML.
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    var str = JSON.stringify(data)
    response.write(str);
    response.end();
  }

  if(request.method === 'OPTIONS') {
    var permitted = 200;
    var denied = 403;
    var method = request.headers['access-control-request-method'];
    var allowed = (defaultCorsHeaders['access-control-allow-methods'].split(', ').indexOf(method) > -1) ? true : false;
    var statusCode = allowed ? permitted : denied;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end();
  }

  if(request.method === 'POST') {
    request.on('readable', function () {
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      // You will need to change this if you are sending something other than plain text, like JSON or HTML.
      headers['Content-Type'] = "text/plain";
      response.writeHead(statusCode, headers);

      var chunk = null;
      var chat = "";

      while(null !== (chunk = request.read())) {
        chat += chunk.toString();
      }

      chat = JSON.parse(chat);
      data.results.push(chat);
      console.log(chat);
      console.log('data', data);
      // response.write(JSON.stringify(data));
    });
    // response.end();
    request.on('end', function() {
      response.end();
      console.log('post request ended')
    });
  }


};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;




// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.
