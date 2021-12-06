class Api::V1::ArtworkSavesController < ApplicationController
  before_action :authorized, only: %i[ index create destroy ]
  before_action :set_artwork_save, only: :destroy
  before_action :authorize_ownership, only: :destroy
  
  def index
    user = current_user
    @artworks = user.saved_artworks
  end

  def create
    @user = current_user

    # Check whether the request wants to use the id of an Artwork already saved in our database
    # or whether it wants to save based on aic_id (id of resource from external API).
    # If using external API id, ArtworkSave will use class method to find Artwork in our database,
    # or make an external API call and create the Artwork in our database.
    if !params["artwork_save"]["artwork_id"].nil?
      @artwork_save = @user.artwork_saves.build(artwork_save_params)      
    elsif !params["artwork_save"]["aic_id"].nil?
      @artwork_save = ArtworkSave.new_by_aic_id(@user.id, params["artwork_save"]["aic_id"].to_i)
    else
      render json: ["Invalid parameters"], status: :unprocessable_entity
    end

    if @artwork_save.save
      render :show, status: :created, location: api_v1_artwork_save_url(@artwork_save)
    else
      render json: @artwork_save.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @artwork_save.destroy
    head :no_content
  end

  private
  def set_artwork_save
    @artwork_save = ArtworkSave.find(params[:id])
  end

   # Make sure the currently logged in user can only update their own ArtworkSaves.
   def authorize_ownership
    if @artwork_save.user != current_user
      render json: ["Unauthorized"], status: :forbidden
      return # Guard clause
    end
  end

  def artwork_save_params
    params.require(:artwork_save).permit(:artwork_id, :aic_id)
  end
end
