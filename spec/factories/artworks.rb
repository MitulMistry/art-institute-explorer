FactoryBot.define do
  factory :artwork do
    title { Faker::Lorem.sentence }
    alt_text { Faker::Lorem.sentence }
    artist_title { Faker::Name.name }
    image_url { "https://www.artic.edu/iiif/2/#{rand(20000..28000)}/full/843,/0/default.jpg" }
  end
end
