class Menuitems < ActiveRecord::Migration[5.2]
  def change
    create_table :menuitems do |t|
      t.string :name, null: false
      t.text :description
      t.string :type, null: false
      t.decimal :price, precision: 8, scale: 2, null: false
      t.timestamps
    end
  end
end
