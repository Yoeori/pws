class User < ActiveRecord::Base
  has_many :tokens, :dependent => :destroy
  has_many :received_messages, class_name: 'Message', foreign_key: "receiver_id"
  has_many :sended_messages, class_name: 'Message', foreign_key: "sender_id"
end
