class AddViewsToEvents < ActiveRecord::Migration[5.2]
	def change
		add_column :events, :views, :integer
	end
end
