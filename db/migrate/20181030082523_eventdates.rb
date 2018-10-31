class Eventdates < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :date
    add_column :events, :start_date, :datetime
    add_column :events, :end_date, :datetime
  end
end
