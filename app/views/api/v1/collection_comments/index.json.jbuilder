json.collection_comments do
  json.array! @collection_comments, partial: "api/v1/collection_comments/collection_comment", as: :collection_comment
end

json.partial! "api/v1/utilities/page_counts", pages: @pages