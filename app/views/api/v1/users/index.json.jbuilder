json.users do
  json.array! @users, partial: "api/v1/users/user", as: :user
end

json.partial! "api/v1/utilities/page_counts", pages: @pages