FactoryBot.define do
  factory :collection_like do
    association :user
    association :collection

    factory :invalid_collection_like do
      collection { nil }
    end
  end
end
