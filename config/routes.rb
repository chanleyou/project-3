Rails.application.routes.draw do
  devise_for :chefs, path: 'chefs'
  devise_for :customers, path: 'customers'
	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

	resources :chefs do 
		resources :events
	end
	
	resources :events do
		collection do
			get 'landing'
		end
	end

  root 'events#landing'
end
