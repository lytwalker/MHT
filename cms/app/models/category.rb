class Category < ActiveRecord::Base
  belongs_to :type
  has_many :products, dependent: :destroy
end
