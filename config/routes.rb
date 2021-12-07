Rails.application.routes.draw do  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users

      resources :sessions, only: [:create]
      delete '/sessions', to: 'sessions#destroy'
      
      get '/artworks/search' => 'artworks#search'
      resources :artworks, only: [:index, :show]      
      resources :artwork_saves, only: [:index, :create, :destroy]
      
      get '/collections/liked' => 'collections#liked'
      resources :collections      
      resources :collection_likes, only: [:create, :destroy]
      resources :collection_comments, only: [:index, :show, :create, :update, :destroy]
      get '/collection_comments/collection/:id' => 'collection_comments#collection', as: 'collection_comments_by_collection'
    end
  end

  root to: 'static_pages#root'
end
