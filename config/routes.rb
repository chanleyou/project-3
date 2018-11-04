Rails.application.routes.draw do
  devise_for :chefs, path: 'chefs'
  devise_for :customers, path: 'customers'
	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'faq' => 'events#faq', as: 'faq'

	resources :chefs do
		resources :events
	end


	resources :events do
		resources :orders

		collection do
			get :autocomplete
		end

		collection do
			get 'landing'
		end

	end

	resources :orders

	root 'events#landing'
	
	get 'search', to: 'search#search'

end
