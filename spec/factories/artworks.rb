FactoryBot.define do
  factory :artwork do
    aic_id { rand(20000..28000) }
    title { Faker::Lorem.sentence }
    alt_text { Faker::Lorem.sentence }
    artist_title { Faker::Name.name }
    image_id { "1adf2696-8489-499b-cad2-821d7fde4b33" }
    image_url_prefix { "https://www.artic.edu/iiif/2/" }
  end
end
