class EventsController < ApplicationController

	before_action :authenticate_chef!, :except => [ :show, :index, :landing ]

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
		@event = Event.new
		1.times { @event.dishes.build }
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

		@event = Event.create(event_params)
		@event.chef = current_chef

		if @event.save
			redirect_to event_path(@event) # Only if you already have a events/show
		else
			render 'new'
		end

		# @event.save
		# redirect_to @event
  end

	def update
		@event = Event.find(params[:id])

		@event.update(event_params)
		redirect_to @event
  end

	def destroy
		@event = Event.find(params[:id])
		@event.destroy

		redirect_to events_path
	end

	private
  def event_params
    params.require(:event).permit(:title, :location, :date, :description, :chef_id, :photo_url, :address, :postcode, :lat, :lng, dishes_attributes: [:id, :name, :description, :_destroy])
  end
end
