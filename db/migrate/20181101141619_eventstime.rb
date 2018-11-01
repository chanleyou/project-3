class Eventstime < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :location
    add_column :events, :start_time, :time
    add_column :events, :end_time, :time
  end
end
