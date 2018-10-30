class EventsController < ApplicationController

	before_action :authenticate_chef!, :except => [ :show, :index ]

	def landing
		@events = Event.all
	end

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
    if params[:event][:photo_url]
      uploaded_file = params[:event][:photo_url].path
      cloudnary_file = Cloudinary::Uploader.upload(uploaded_file)
      params[:event][:photo_url] = cloudnary_file['public_id']
    end

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
    params.require(:event).permit(:title, :location, :date, :description, :chef_id, :photo_url, :address, :postcode, :lat, :lng)
  end
end
