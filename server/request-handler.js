// var fs = require('fs');
// var appendToHardDrive = function (message) {
//   debugger
// }

var utils = require('./utils');

var messages = {
  results: [{username: 'brian', text: 'yolo', time: 1433202049000}]
}

var actions = {
  'GET': function (request, response) {
    utils.sendResponse(response, messages)
  },
  'OPTIONS': function (request, response) {  
    utils.setPermissions(request, response);
  },
  'POST': function (request, response) {
    utils.collectData(request, function (message) {
      messages.results.push(message);
      utils.sendResponse(response, null)
    }) 
  }
}


var requestHandler = function(request, response) {
  var action = actions[request.method];
  if( action ) {
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
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
