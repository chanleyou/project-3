class Menuitems2 < ActiveRecord::Migration[5.2]
  def change
    remove_column :menuitems, :type
    add_column :menuitems, :course, :string, null: false
  end
end
