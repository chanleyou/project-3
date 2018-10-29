class Menuitems3 < ActiveRecord::Migration[5.2]
  def change
    add_reference :menuitems, :event, index: true, foreign_key: true, null: false
  end
end
