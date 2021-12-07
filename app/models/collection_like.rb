class CollectionLike < ApplicationRecord
  belongs_to :user
  belongs_to :collection, counter_cache: true
end
