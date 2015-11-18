Rails.application.routes.draw do

  get '/api', to: 'api#index'

  namespace :api do
    resources :users
  end

end
