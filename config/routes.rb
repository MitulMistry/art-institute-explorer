Rails.application.routes.draw do
  resources :collection_comments
  resources :collection_likes
  resources :collections
  resources :artworks
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
