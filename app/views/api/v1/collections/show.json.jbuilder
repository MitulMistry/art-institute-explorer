# naming local "collection" leads to a jbuilder error, so name it something else: "local_collection"
json.partial! "api/v1/collections/collection", local_collection: @collection
