var Message = Backbone.Model.extend({

  initialize: function() {
    this.collection.counter++;
    this.set('objectId', this.collection.counter);
  },

  url: 'http://127.0.0.1:3000',
  defaults: {
    username: 'No Name',
    text: "No Message"
  }
});

var Messages = Backbone.Collection.extend({
  // url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function () {
    // this.on('change', function (e) {
    //   //this.loadMsgs();
    // }, this);

    // this.on('add', function (e) {
    // }, this);
  },
  counter: 0,

  url: 'http://127.0.0.1:3000',

  // parse is a native function that will execute after a successful .fetch().
  // It will pass the fetched data as an argument
  //
  //
  parse: function (data) {
    console.log(data);
    var results = [];
    var result;

    for(var i = 0; i < data.results.length; i++) {
      result = data.results[i];
      if(result.objectId > Messages.counter){
        results.push(data.results[i]);
      }
    }
    return results;
  },
  model: Message,

  loadMsgs: function() {
    this.fetch();
    //returns a JSON array of models.
  }
});


var FormView = Backbone.View.extend({

  // initialize: function () {
  // },

  events: {
    // 'click .submit': this.handleSubmit
    'click .submit': 'handleSubmit'
  },

  handleSubmit: function(){
    var $text = this.$('#message');
    this.collection.create({
      username: this.$('.name').val(),
      text: $text.val()
    });

    $text.val('');
  },

});

//TODO below here!
//

var MessageView = Backbone.View.extend({
  template: _.template("<span class='username'><%- username %></span> : <span class='message'><%- text %></span>"),

  render: function(){

    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.render, this);
    this.onscreenMessages = {};
  },

  render: function(){
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage: function(message){
    if( !this.onscreenMessages[message.get('objectId')] ){
      var messageView = new MessageView({model: message});
      this.$el.prepend(messageView.render());
      this.onscreenMessages[message.get('objectId')] = true;
    }
  }
});

// var messages = new Messages({model:Message});
// messages.loadMsgs();
// messages.fetch();

// setInterval(function () {
//   messages.fetch();
// }, 1000);

// var m = new Message('hello', 'world');
// var v = new MessageView({ model: m});
// m.set('message', 'foofoo');




// var mostRecentMessager app = {
//   server: '
//   init: function() {



//     $(document).on('ready', function () {

//       $(".submit").on("click", function() {
//         app.handleSubmit();
//       });

//       $("#chats").on("click", ".username", function() {
//         app.addFriend(this);
//       });

//       // fetch messages, and re-fetch every 1 second
//       app.fetch();
//       setInterval(app.fetch, 1000);
//     });


//   }, // end init function //


//   send: function (message) {
//       var valid = !isInvalid(message.username, message.text);
//       if(valid) {
//         $.ajax({
//           // always use this url
//           url: app.server,
//           type: 'POST',
//           data: JSON.stringify(message),
//           contentType: 'application/json',
//           success: function (data) {
//             console.log('chatterbox: Message sent');
//             $(".message").val("");
//             $(".message").focus();
//           },
//           error: function (data) {
//             // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//             console.error('chatterbox: Failed to send message');
//           }
//         });
//       } else {
//         alert('BAD! DON\'T YOU BE BAD!');
//       }



//   }, // end send function //
//   fetch: function(timestamp) {


//       console.log('refreshed');
//       $.ajax({
//         url:"https://api.parse.com/1/classes/chatterbox",
//         type:'GET',
//         data: {
//           "where": {
//             "createdAt": {
//               "$gt" : mostRecentMessage
//             }
//           }
//         },
//         contentType: 'application/json',
//         success:function(data) {
//           console.log(data);
//           var results = data.results;
//           for(var i=results.length-1; i > -1; i--) {
//             var message = {
//               username: results[i].username,
//               text: results[i].text
//             };
//             app.addMessage(message);
//           }
//           if(results.length > 0) {
//             mostRecentMessage = results[0].createdAt;
//           }
//         }
//       });



//     }, // end fetch function //
//     clearMessages: function () {


//       $('#chats').children().remove();


//     },
//     addMessage: function(message) {


//       var valid = !isInvalid(message.username, message.text);
//       if(valid) {
//         var node = $('<div></div>');
//         node.html("<span class='username'>" + message.username + "</span>" + ' : ' + "<span class='message'>" + message.text + "</span>");
//         $('#chats').prepend(node);
//       } else {
//         console.log('BAD!: ' + message.username + ' ' + message.text);
//       }



//     },
//     addRoom: function (lobbyName) {


//       var node = $("<li>" + lobbyName + "</li>");
//       $('#roomSelect').append(node);


//     },
//     addFriend: function(node) {


//       $(node).css({
//         "font-weight":"bold"
//       })


//     },
//     handleSubmit: function() {


//       var message = {
//         'username': $(".name").val(),
//         'text': $(".message").val(),
//         'roomname': '4chan'
//       };
//       app.send(message);


//     }
// }  // end app

// app.init();


































