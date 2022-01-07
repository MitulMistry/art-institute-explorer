class CollectionComment < ApplicationRecord
  belongs_to :user
  belongs_to :collection

  validates :body, presence: true, length: { maximum: 500 }

  extend ClassOrderable
end
