class OrdersController < ApplicationController

	before_action :authenticate_customer!, :except => [ :index]

	def index
		if (current_chef)
			@chef = current_chef
			
			@orders = []

			@chef.events.each do |event|
				@orders << event.orders
			end

			@orders.flatten!

		elsif (current_customer)
			@customer = current_customer
			@orders = @customer.orders
			
		else
			redirect_to '/'
		end
	end

	def new
		@order = Order.new
		@event = Event.find(params[:event_id])
		@dishes = @event.dishes
		1.times { @order.orderitems.build }

		gon.event = @event

	end
	
	def create
		@order = Order.new(order_params)
		@order.customer = current_customer

		#order.total is calculated, not form filled
		#this needs to be in order#update as well
		@order.total = @order.orderitems.map{|y| y.dish.price * y[:quantity]}.reduce(:+)

		if @order.save
			redirect_to @order.event
		else
			render 'new'
		end
	end

	def edit
	end

	def update
	end
	
	def order_params
    params.require(:order).permit(:event_id, :customer_id, :time, orderitems_attributes: [:id, :dish_id, :quantity, :_destroy])
  end

end
