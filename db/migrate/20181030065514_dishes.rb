class Dishes < ActiveRecord::Migration[5.2]
	def change
		create_table :dishes do |t|
			t.string :name
			t.string :description
			t.references :event
			t.timestamps
		end
  end
end
