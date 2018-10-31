class Orders < ActiveRecord::Migration[5.2]
	def change
		create_table :orders do |t|
			t.references :event
			t.references :customer
			t.datetime :time
			t.timestamps
		end
		create_table :orderitems do |t|
			t.references :order
			t.references :dish
			t.integer :quantity
			t.timestamps
		end
	end
end
