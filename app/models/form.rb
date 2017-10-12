class Form < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true 
  attr_accessor :form_disclaimer
end
