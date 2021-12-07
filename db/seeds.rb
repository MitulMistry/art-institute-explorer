# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  10.times do
    user = User.new(
      username: Faker::Internet.user_name,
      email: Faker::Internet.email,
      password: "password",
      bio: Faker::Lorem.paragraph
      )
    # user.avatar_from_url("http://loremflickr.com/400/400/portrait")
    user.save
  end
end

artwork1 = Artwork.create(
  aic_id: 27992,
  title: "A Sunday on La Grande Jatte — 1884",
  alt_text: "Large painting of people in a crowded park, brushstrokes are dots.",
  artist_title: "Georges Seurat",
  image_id: "1adf2696-8489-499b-cad2-821d7fde4b33",
  image_url_prefix: "https://www.artic.edu/iiif/2/"
)

artwork2 = Artwork.create(
  aic_id: 151424,
  title: "Inventions of the Monsters",
  alt_text: "Painting of stark landscape populated by strange figures, everyday objects, and a burning giraffe.",
  artist_title: "Salvador Dalí",
  image_id: "be9551d4-860f-37a0-1408-086617f1824e",
  image_url_prefix: "https://www.artic.edu/iiif/2/"
)

artwork3 = Artwork.create(
  aic_id: 109028,
  title: "Renewal of the Alliance Between the French and the Swiss in 1663",
  alt_text: "A work made of engraving and etching on paper.",
  artist_title: "Sébastien Le Clerc, the elder",
  image_id: "486fa1ec-536c-0255-4e7f-baed5eed8037",
  image_url_prefix: "https://www.artic.edu/iiif/2/"
)

ActiveRecord::Base.transaction do
  3.times do
    user = User.order("RANDOM()").first
    collection = user.collections.build(
      title: Faker::Lorem.sentence,
      description: Faker::Lorem.paragraph
    )
    collection.artworks << artwork1
    collection.artworks << artwork2 if rand(1) == 1
    collection.artworks << artwork3 if rand(1) == 1
    collection.save
  end
end

ActiveRecord::Base.transaction do
  10.times do
    user = User.order("RANDOM()").first
    collection_comment = user.collection_comments.build(body: Faker::Lorem.paragraph)
    collection_comment.collection = Collection.order("RANDOM()").first
    collection_comment.save
  end

  10.times do
    user = User.order("RANDOM()").first
    collection = Collection.order("RANDOM()").first
    user.liked_collections << collection unless collection.user == user
  end
end
