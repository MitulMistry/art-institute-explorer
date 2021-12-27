class Api::V1::CollectionLikesController < ApplicationController
  before_action :authorized, only: %i[ create destroy destroy_by_collection_id ]
  before_action :set_collection_like, only: %i[ destroy ]
  before_action :authorize_ownership, only: %i[ destroy ]

  def create
    # Check for duplicate CollectionLike
    @collection_like = CollectionLike.where(collection_id: collection_like_params["collection_id"], user_id: current_user.id).first
   
    if !@collection_like
      @collection_like = current_user.collection_likes.build(collection_like_params)

      if @collection_like.save
        render :show, status: :created, location: api_v1_collection_like_url(@collection_like)
      else
        render json: @collection_like.errors, status: :unprocessable_entity
      end
    else
      render_duplicate
    end
  end

  def destroy
    @collection_like.destroy
    head :no_content
  end

  def destroy_by_collection_id
    collection = Collection.find(params[:id])
    if collection
      collection_like = CollectionLike.where(collection_id: collection.id, user_id: current_user.id).first
      if collection_like
        collection_like.destroy
        head :no_content
      else
        render_not_found
      end
    else
      render_not_found
    end
  end
end

private
def set_collection_like
  @collection_like = CollectionLike.find(params[:id])
end

# Make sure the currently logged in user can only update their own Comment.
def authorize_ownership
  if @collection_like.user != current_user
    render_forbidden
    return # Guard clause
  end
end

# Only allow a list of trusted parameters through.
def collection_like_params
  params.require(:collection_like).permit(:collection_id)
end