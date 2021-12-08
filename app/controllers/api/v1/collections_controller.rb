class Api::V1::CollectionsController < ApplicationController
  before_action :authorized, only: %i[ liked create update destroy ]
  before_action :set_collection, only: %i[ show update destroy ]
  before_action :authorize_ownership, only: %i[ update destroy ]

  def index
    @collections = Collection.all
  end

  def liked
    @collections = current_user.liked_collections
    render template: "api/v1/collections/index"
  end

  def show
  end

  def create    
    @collection = current_user.collections.build(collection_params.except(:artwork_aic_ids))
    artwork_aic_ids = params["collection"]["artwork_aic_ids"]

    process_artwork_aic_ids(artwork_aic_ids)

    if @collection.save
      render :show, status: :created, location: api_v1_collection_url(@collection)
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  def update
    artwork_aic_ids = params["collection"]["artwork_aic_ids"]

    if @collection.update(collection_params.except(:artwork_aic_ids))
      process_artwork_aic_ids(artwork_aic_ids)
      render :show, status: :ok, location: api_v1_collection_url(@collection)
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @collection.destroy
    head :no_content
  end

  private
  def set_collection
    @collection = Collection.find(params[:id])
  end

  # Make sure the currently logged in user can only update their own Collection.
  def authorize_ownership
    if @collection.user != current_user
      render json: ["Unauthorized"], status: :forbidden
      return # Guard clause
    end
  end

  # Process Artworks via aic_ids. Either find or create new Artworks and add them
  # to the @collection
  def process_artwork_aic_ids(artwork_aic_ids)
    if(!artwork_aic_ids.nil? && !artwork_aic_ids.empty?)

      # Convert array of strings to integers
      artwork_aic_ids = artwork_aic_ids.map(&:to_i)
      aic_artworks = Artwork.find_or_create_by_aic_ids(artwork_aic_ids)
      
      if aic_artworks && !aic_artworks.empty?
        aic_artworks.each do |artwork|
          unless @collection.artworks.include?(artwork)
            @collection.artworks << artwork
          end
        end
      end
    end
  end

  # Only allow a list of trusted parameters through.
  def collection_params
    params.require(:collection).permit(:title, :description, artwork_ids: [], artwork_aic_ids: [])
  end
end
