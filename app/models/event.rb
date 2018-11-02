require 'elasticsearch/model'

class Event < ActiveRecord::Base
	belongs_to :chef
  belongs_to :truck
	has_many :dishes, dependent: :destroy
	has_many :orders
	accepts_nested_attributes_for :dishes, reject_if: lambda {|attributes| attributes['name'].blank?}, allow_destroy: true
	include Elasticsearch::Model
	include Elasticsearch::Model::Callbacks

	def self.search(query)
		__elasticsearch__.search(
		 {
			query: {
			 multi_match: {
				query: query,
				fields: ['title^10', 'description', 'address'] #this only works with string fields, not integer 
			 }
			}
		 }
		)
	 end

end

Event.import force: true # for auto sync model with elastic search