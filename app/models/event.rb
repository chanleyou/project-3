class Event < ActiveRecord::Base
	belongs_to :chef
  has_many :menuitems
end