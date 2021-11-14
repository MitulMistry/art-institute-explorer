FactoryBot.define do
  factory :collection_like do
    association :user
    association :collection
  end
end
