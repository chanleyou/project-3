class OrdersController < ApplicationController

	before_action :authenticate_customer!

	def show
		@order = Order.find(params[:id]) 
		
		# price = sum of order items quantity * dish price reduced. not sure if it works
		@price = @order.orderitems.map{|y| y.dish.price * y[:quantity]}.reduce(:+)

	end

	def new
		@order = Order.new
		@event = Event.find(params[:event_id])
		@dishes = @event.dishes
		1.times { @order.orderitems.build }
	end
	
	def create
		@order = Order.new(order_params)
		@order.customer = current_customer

		if @order.save
			redirect_to @order
		else
			render 'new'
		end
	end
	
	def order_params
    params.require(:order).permit(:event_id, :customer_id, :time, orderitems_attributes: [:id, :dish_id, :quantity, :_destroy])
  end

end
