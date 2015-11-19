if(@authorized)
  json.message "message was send"
else
  json.error true
  json.message "not authorized"
end
