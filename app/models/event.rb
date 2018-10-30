class Event < ActiveRecord::Base
	belongs_to :chef
	has_many :dishes
	accepts_nested_attributes_for :dishes, reject_if: lambda {|attributes| attributes['name'].blank?}, allow_destroy: true
end