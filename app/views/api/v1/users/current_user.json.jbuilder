json.extract! @user, :id, :username, :email, :created_at, :updated_at

json.saved_artworks_aic_ids @user.saved_artworks_aic_ids

json.url api_v1_user_url(@user, format: :json)
