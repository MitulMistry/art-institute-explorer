class Api::V1::CollectionLikesController < ApplicationController
  before_action :authorized, only: %i[ create destroy ]
  before_action :set_collection_like, only: %i[ destroy ]
  before_action :authorize_ownership, only: %i[ destroy ]

  def create
    @collection_like = current_user.collection_likes.build(collection_like_params)

    if @collection_like.save
      render :show, status: :created, location: api_v1_collection_like_url(@collection_like)
    else
      render json: @collection_like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @collection_like.destroy
    head :no_content
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