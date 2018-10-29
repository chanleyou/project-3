class EventsController < ApplicationController

	# should this be authenticate_user or authenticate_chef?
	before_action :authenticate_chef!, :except => [ :show, :index ]
	
	def index
		if params.has_key?(:chef_id)
			@events = Event.where(chef_id: params[:chef_id] )
		else
			@events = Event.all
		end
  end

	def show
		@event = Event.find(params[:id])
  end

	def new
  end

	def edit
		@event = Event.find(params[:id])
  end
	
	def create
		@event = Event.new(event_params)
		@event.chef = current_chef
		
		@event.save
		redirect_to @event
  end
	
	def update
		@event = Event.find(params[:id])
	
		@event.update(event_params)
		redirect_to @event
  end

	def destroy
		@event = Event.find(params[:id])
		@event.destroy

		redirect_to entries_path
	end
	
	private
  def event_params
    params.require(:event).permit(:title, :location, :date, :description, :chef_id)
  end
end
