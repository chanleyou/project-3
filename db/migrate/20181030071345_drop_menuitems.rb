class DropMenuitems < ActiveRecord::Migration[5.2]
	def change
		drop_table :menuitems
  end
end
