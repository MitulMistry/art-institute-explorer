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
    # Needs to process aic_ids to create new Artworks if not existing, with single API request
    # and single database transaction.
    # Also need to add tests for Artwork creation in Collections requests spec

    # if params["artwork_aic_ids"]
    #   # Process Artworks via aic_ids
    # end

    @collection = current_user.collections.build(collection_params)

    if @collection.save
      render :show, status: :created, location: api_v1_collection_url(@collection)
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  def update
    if @collection.update(collection_params)
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

  # Only allow a list of trusted parameters through.
  def collection_params
    params.require(:collection).permit(:title, :description, artwork_ids: [], artwork_aic_ids: [])
  end
end
