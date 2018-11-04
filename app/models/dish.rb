class Dish < ActiveRecord::Base
	belongs_to :event
	has_many :orderitems

	def menuprice
		"#{name} $#{price}"
	end
end