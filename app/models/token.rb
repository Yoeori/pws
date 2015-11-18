class Token < ActiveRecord::Base
  belongs_to :user
  before_create :set_key
  validates :user, presence: true

  def set_key
    unless(self.token)
      self.token = (0...50).map{ ('a'..'z').to_a[rand(26)]}.join
    end
  end

end
