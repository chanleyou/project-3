class EventsController < ApplicationController

	before_action :authenticate_chef!, :except => [ :show, :index, :landing, :faq, :autocomplete ]

	def landing
		@popular = Event.order(views: :desc).take(3)

		@upcoming = Event.order(:end_date)

		@upcoming = @upcoming.select { |event| (event.end_date - Time.now) > 0 }.take(3)

		gon.events = Event.all
	end

	def index
		if params[:q].nil?
			@events = Event.all
		 else
			@events = Event.search params[:q]
		 end
  end

	def show
		@event = Event.find(params[:id])

		@event.views += 1
		@event.save

		# lets event chef & customers see all their orders for this event
		if (current_chef == @event.chef)
			@orders = @event.orders
		elsif (current_customer)
			@orders = current_customer.orders & @event.orders # & is array intersection
		else
			@orders = []
		end

		@orders.sort_by {|order| order.time }

		@order = Order.new
		@dishes = @event.dishes
		1.times { @order.orderitems.build }
	end

	def new
		@event = Event.new
		1.times { @event.dishes.build }

    gon.eventsBasicTruck = Event.where(truck_id: Truck.where(trucktype: "basic")[0].id)
    gon.eventsKitchenTruck = Event.where(truck_id: Truck.where(trucktype: "kitchen")[0].id)
    gon.eventsFreezerTruck = Event.where(truck_id: Truck.where(trucktype: "freezer")[0].id)
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

		if @event.save
			redirect_to @event
		else
			render 'new'
		end
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

	def autocomplete
		render json: Event.search(params[:q]).map do |event|
			{ title: event.title, value: event.id }
		end
	end

	private
  def event_params
    params.require(:event).permit(:title, :start_date, :end_date, :start_time, :end_time, :description, :chef_id, :truck_id, :views, :photo_url, :address, :postcode, :lat, :lng, dishes_attributes: [:id, :name, :description, :price, :course, :_destroy])
  end
end
