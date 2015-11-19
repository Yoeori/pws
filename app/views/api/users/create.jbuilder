if(@created)
  json.user(@user, :pubkey, :username)
  json.(@token, :token)
  json.created true
else
  json.error true
  json.message "username already exists"
end
