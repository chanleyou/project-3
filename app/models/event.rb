class Event < ActiveRecord::Base
	belongs_to :chef
  belongs_to :truck
	has_many :dishes, dependent: :destroy
	has_many :orders
	accepts_nested_attributes_for :dishes, reject_if: lambda {|attributes| attributes['name'].blank?}, allow_destroy: true
end