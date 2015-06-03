var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type': 'application/json'
};

exports.sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.write(JSON.stringify( data ));
  response.end();
}

exports.collectData = function(request, callback) {
  var chat = "";
  
  request.on('data', function (chunk) {
    chat += chunk;
  });
  
  request.on('end', function() {
    callback( JSON.parse(chat) );
  }); 
}

exports.setPermissions = function (request, response) {
  var permitted = 200;
  var denied = 403;
  var method = request.headers['access-control-request-method'];
  var allowed = (headers['access-control-allow-methods'].split(', ').indexOf(method) > -1) ? true : false;
  var statusCode = allowed ? permitted : denied;
  exports.sendResponse(response, null, statusCode);
}
