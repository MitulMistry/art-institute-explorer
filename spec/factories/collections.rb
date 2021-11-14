FactoryBot.define do
  factory :collection do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    association :user
  end
end
