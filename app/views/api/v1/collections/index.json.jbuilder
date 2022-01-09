json.collections do
  json.array! @collections, partial: "api/v1/collections/collection_brief", as: :local_collection
end

json.partial! "api/v1/utilities/page_counts", pages: @pages