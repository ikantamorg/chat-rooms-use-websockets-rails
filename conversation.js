(function($) {
  $(function() {
    var $form = $('.form'),
        $input = $('#message_body'),
        receiver_id =  parseInt($form.attr('data-receiver-id')),
        conversation_id =  parseInt($form.attr('data-conversation-id')),
        sender_id = parseInt($form.attr('data-sender-id'));
    var client = new Faye.Client(location.origin + '/faye');
    var $messages = $('.box__message');

    client.subscribe('/conversations/' + $form.attr('data-conversation-id'), function(data){
      if (data.message){
        var $message = renderMessage(data.message);
        var day = $('.box__content__day__date').last().html();
        var $messages_containers = $('.box__content__day__messages');

        $messages_containers.last().append($message);
      }
    });

    $form.submit(function(){
      // Publish the message to the public channel
      $.ajax({
        method: 'POST',
        url: Routes.reply_to_conversation_path(conversation_id),
        data: {
          message: {
            body: $input.val(),
            conversation_id: conversation_id,
            receiver_id: receiver_id
          }
        }
      });
      $input.val('');
      
      return false;
    });

    $input.keydown(function (e) {
      if (e.ctrlKey && e.keyCode === 13) {
        $form.submit();
        return false; 
      }
    }); 

  });
})(jQuery);
