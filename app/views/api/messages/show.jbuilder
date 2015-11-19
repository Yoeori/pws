if(@authorized)
  json.messages @messages do |message|
    json.message message.message
    json.from message.sender.username
    json.from_id message.sender_id
  end
else
  json.error true
  json.message "not authorized"
end

# I'm sorry :c
@auth_user.received_messages.destroy_all;
