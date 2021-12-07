class Api::V1::CollectionCommentsController < ApplicationController
  before_action :authorized, only: %i[ create update destroy ]
  before_action :set_collection_comment, only: %i[ show update destroy ]
  before_action :set_collection, only: :collection
  before_action :authorize_ownership, only: %i[ update destroy ]

  def index
    @collection_comments = CollectionComment.all
  end

  def show
  end

  def collection
    @collection_comments = @collection.collection_comments
    render template: "api/v1/collection_comments/index"
  end

  def create
    @collection_comment = current_user.collection_comments.build(collection_comment_params)

    if @collection_comment.save
      render :show, status: :created, location: api_v1_collection_comment_url(@collection_comment)
    else
      render json: @collection_comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @collection_comment.update(collection_comment_params)
      render :show, status: :ok, location: api_v1_collection_comment_url(@collection_comment)
    else
      render json: @collection_comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @collection_comment.destroy
    head :no_content
  end
end

private
def set_collection_comment
  @collection_comment = CollectionComment.find(params[:id])
end

def set_collection
  @collection = Collection.find(params[:id])
end

# Make sure the currently logged in user can only update their own Comment.
def authorize_ownership
  if @collection_comment.user != current_user
    render json: ["Unauthorized"], status: :forbidden
    return # Guard clause
  end
end

# Only allow a list of trusted parameters through.
def collection_comment_params
  params.require(:collection_comment).permit(:body, :collection_id)
end