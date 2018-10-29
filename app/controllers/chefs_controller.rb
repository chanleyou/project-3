class ChefsController < ApplicationController

	# only index and show routes here, the rest are handled by devise

	def index
		@chefs = Chef.all
  end

	def show
		@chef = Chef.find(params[:id])
		@events = @chef.events
  end

end
