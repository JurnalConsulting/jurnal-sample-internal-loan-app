class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :forms, dependent: :destroy 

  # # Skip password for user
  # def password_required?
  #    new_record? ? false : super
  # end
end
