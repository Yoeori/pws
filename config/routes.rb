Rails.application.routes.draw do

  get '/api', to: 'api#index'

  namespace :api do
    resources :users
    post '/messages', to: 'messages#create'
    get '/messages', to: 'messages#show'
  end

end
