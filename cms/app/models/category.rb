class Category < ActiveRecord::Base
  	belongs_to :categorytype
	has_many :products, dependent: :destroy
end
