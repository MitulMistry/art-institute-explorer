Rails.application.routes.draw do  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users

      resources :sessions, only: [:create]
      delete '/sessions', to: 'sessions#destroy'
      
      resources :artworks, only: [:index, :show]
      resources :saved_artworks, only: [:index, :create, :destroy]
      resources :collections
      resources :collection_likes, only: [:create, :destroy]
      resources :collection_comments, only: [:create, :update, :destroy]
    end
  end

  root to: 'static_pages#root'
end
