class Dish < ActiveRecord::Base
	belongs_to :event
	has_many :orderitems
end