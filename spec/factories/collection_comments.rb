FactoryBot.define do
  factory :collection_comment do
    body { Faker::Lorem.paragraph }
    association :user
    association :collection
  end
end
