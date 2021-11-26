FactoryBot.define do
  factory :collection do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    association :user

    factory :invalid_collection do
      title { nil }
    end
  end
end
