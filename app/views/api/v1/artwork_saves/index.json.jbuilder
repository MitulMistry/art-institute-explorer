json.artworks do
  json.array! @artworks, partial: "api/v1/artworks/artwork", as: :artwork
end

json.partial! "api/v1/utilities/page_counts", pages: @pages