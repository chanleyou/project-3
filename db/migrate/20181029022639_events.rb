class Events < ActiveRecord::Migration[5.2]
	def change
		create_table :events do |t|
			t.string :title
			t.string :location
			t.datetime :date
			t.text :description
			t.references :chef
			t.timestamps
		end
  end
end
