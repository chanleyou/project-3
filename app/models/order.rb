class Order < ActiveRecord::Base
	belongs_to :event
	belongs_to :customer
	has_many :orderitems
	accepts_nested_attributes_for :orderitems, allow_destroy: true, reject_if: lambda {|attributes| attributes['quantity'].blank?}
end