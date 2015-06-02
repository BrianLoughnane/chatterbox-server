
var isInvalid = function (username, message) {
    return  !username || !message || !!username.match(/[^\w\s]/) || !!message.match(/[^\w\s]/);
}
var lastFetched = undefined;


var app = {
  server: 'http://127.0.0.1:3000',
  init: function() {
    // assign event handlers to submit message
    $(document).on('ready', function () {
      $(".submit").on("click", function() {
        app.handleSubmit();
      });
      $("#chats").on("click", ".username", function() {
        app.addFriend(this);
      });
      // fetch messages, and re-fetch every 1 second
      app.fetch();
      setInterval(app.fetch, 1000);
    });
  }, // end init function //
  send: function (message) {
      var valid = !isInvalid(message.username, message.text);
      if(valid) {
        message.time = Date.parse(new Date());

        $.ajax({
          // always use this url
          url: app.server + '/send',
          type: 'POST',
          data: JSON.stringify(message),
          //contentType: 'application/json',
          success: function (data) {
            console.log('chatterbox: Message sent');
            $(".message").val("");
            $(".message").focus();
          },
          error: function (data) {
            // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message');
          }
        });
      } else {
        alert('BAD! DON\'T YOU BE BAD!');
      }
  }, // end send function //
  fetch: function() {
      console.log('refreshed');
      $.ajax({
        // url: app.server + '/classes/room1',
        url: app.server + '/classes/room1',
        type:'GET',
        success:function(data) {
          results = JSON.parse(data).results;
          console.log(results);
          for(var i=0; i < results.length; i++) {
            var time = results[i].time;
            if(time > lastFetched || !lastFetched) {
              var message = {
                username: results[i].username,
                text: results[i].text
              };
              app.addMessage(message);
            }
            if(i === results.length - 1) {
              lastFetched = time;
            }
          }

        }
      });
    }, // end fetch function //
    clearMessages: function () {
      $('#chats').children().remove();
    },
    addMessage: function(message) {
      var valid = !isInvalid(message.username, message.text);
      if(valid) {
        var node = $('<div></div>');
        node.html("<span class='username'>" + message.username + "</span>" + ' : ' + "<span class='message'>" + message.text + "</span>");
        $('#chats').prepend(node);
      } else {
        console.log('BAD!: ' + message.username + ' ' + message.text);
      }
    },
    addRoom: function (lobbyName) {
      var node = $("<li>" + lobbyName + "</li>");
      $('#roomSelect').append(node);
    },
    addFriend: function(node) {
      $(node).css({
        "font-weight":"bold"
      })
    },
    handleSubmit: function() {
      var message = {
        'username': $(".name").val(),
        'text': $(".message").val(),
        'roomname': '4chan'
      };
      app.send(message);
    }

    // make user object
      // name : set name from input

      // validate no XSS


    // Allow users to send messages

    // if the user name is not set
      // throw error
    // else
      // validate message for XSS
      // if valid
        // make POST call to parse
      // else
        // throw an error



    /////////////////// NOTE
    // Be careful to use proper escaping on any user input.
    // Since you're displaying input that other users have typed, your app is vulnerable XSS attacks.
    // Note: If you issue an XSS attack, make it innocuous enough to be educational, rather than disruptive.



    ////////////////////// Rooms ////////////////////////////

    // Allow users to create rooms and enter existing rooms
    // //(rooms are defined by the message.room property of messages, so you'll need to filter them somehow)






    /////////////////// Socializing  ////////////////////////////

    // Allow users to 'befriend' other users by clicking on their username
    // Display all messages sent by friends in bold

}  // end app

app.init();


