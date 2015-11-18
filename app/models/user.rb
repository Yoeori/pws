class User < ActiveRecord::Base
  has_many :tokens, :dependent => :destroy
end
