FactoryBot.define do
  factory :collection_comment do
    body { Faker::Lorem.paragraph }
    association :user
    association :collection

    factory :invalid_collection_comment do
      body { nil }
    end
  end
end
