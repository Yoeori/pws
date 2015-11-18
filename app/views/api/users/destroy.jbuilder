if(@destroyed)
  json.destroyed true
  json.message "Token has also been made invalid"
else
  json.destroyed false
  json.message "User couldn't be destroyed"
end
