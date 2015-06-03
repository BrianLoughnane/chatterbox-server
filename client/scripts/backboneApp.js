var Message = Backbone.Model.extend({

  initialize: function() {
    this.collection.counter++;
    this.set('objectId', this.collection.counter);
  },

  url: 'http://127.0.0.1:3000/send',
  defaults: {
    username: 'No Name',
    text: "No Message"
  }
});

var Messages = Backbone.Collection.extend({
  counter: 0,
  url: 'http://127.0.0.1:3000/classes/chatterbox',
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
  }
});


var FormView = Backbone.View.extend({
  events: {
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
