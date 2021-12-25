Rails.application.routes.draw do  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users

      resources :sessions, only: [:create]
      delete '/sessions', to: 'sessions#destroy'
      
      resources :mixed_data, only: [:index]

      get '/artworks/search' => 'artworks#search'
      resources :artworks, only: [:index, :show]      
      resources :artwork_saves, only: [:index, :create, :destroy]
      delete '/artwork_saves/artwork_id/:id' => 'artwork_saves#destroy_by_artwork_id', as: 'artwork_save_by_artwork_id'
      delete '/artwork_saves/aic_id/:id' => 'artwork_saves#destroy_by_aic_id', as: 'artwork_save_by_aic_id'      
      
      get '/collections/liked' => 'collections#liked'
      resources :collections      
      resources :collection_likes, only: [:create, :destroy]
      delete '/collection_likes/collection_id/:id' => 'collection_likes#destroy_by_collection_id', as: 'collection_like_by_collection_id'
      resources :collection_comments, only: [:index, :show, :create, :update, :destroy]
      get '/collection_comments/collection/:id' => 'collection_comments#collection', as: 'collection_comments_by_collection'
    end
  end

  root to: 'static_pages#root'
  get '*path', to: 'static_pages#root'
end
