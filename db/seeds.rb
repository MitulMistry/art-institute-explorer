# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Title of collection as key, array of aic_ids as value
collection_data = {
  "Works of Interest": [75644, 863, 11320, 24645],
  "Forgotten Classics": [28862, 16571, 9503],
  "Sources of Inspiration": [69780, 80607, 129884],
  "Thought Provoking Works": [64957, 21023, 81539, 109314],
  "Powerful Pieces": [28862, 118283, 20684],
  "Intriguing Art": [90048, 64818, 81539, 64957],
  "My Favorites": [129884, 109314, 9503],
  "Impressionism": [64818, 16568, 20684, 27992, 16571, 69780],
  "Cityscapes": [20684, 9503, 118283],
  "Sculptures": [21023, 75644, 159136, 11320],
  "Claude Monet": [87088, 64818, 16568, 16571, 81539],
  "Landscapes": [14586, 28862, 109314, 863, 146701, 90048, 87088],
  "Vincent van Gogh": [80607, 28560, 14586, 109314, 64957],
  "Famous Art": [27992, 129884, 20684, 28067, 24645, 6565]
}

puts "Creating users..."

ActiveRecord::Base.transaction do
  12.times do
    user = User.new(
      username: Faker::Internet.user_name,
      email: Faker::Internet.email,
      password: "password",
      bio: Faker::Lorem.paragraph
      )
    # user.avatar_from_url("http://loremflickr.com/400/400/portrait")
    # sleep(1)
    user.save
  end
end

puts "Creating collections..."

ActiveRecord::Base.transaction do
  collection_data.each do |title, aic_ids|
    user = User.order("RANDOM()").first
    collection = user.collections.build(
      title: title,
      description: Faker::Lorem.paragraph
    )

    artworks = Artwork.find_or_create_by_aic_ids(aic_ids) # Returns array of Artworks
    collection.artworks << artworks if artworks # Add array of Artworks to collection

    collection.save
    sleep(5) # Sleep to slow down (throttle) rate of external API calls
  end
end

puts "Creating saved artworks..."

ActiveRecord::Base.transaction do
  count = 50
  userCount = User.count
  artworkCount = Artwork.count

  while count > 0
    user = User.offset(rand(userCount)).first
    artwork = Artwork.offset(rand(artworkCount)).first

    if !(user.saved_artworks.include?(artwork))
      user.saved_artworks << artwork
      count -= 1
    end
  end
end

# This code keeps getting stuck in infinite loops for duplicate entries
# ActiveRecord::Base.transaction do
#   count = 50

#   while count > 0
#     user = User.order("RANDOM()").first
#     artwork = Artwork.order("RANDOM()").first

#     dummy_collection = []

#     if user.saved_artworks.include?(artwork)     
#       # Add the item to a collection if it's a duplicate, because otherwise
#       # order("RANDOM()") keeps selecting the same item and gets stuck in infinite loop
#       dummy_collection << artwork
#     else
#       user.saved_artworks << artwork
#       count -= 1
#     end
#   end
# end

puts "Creating collection comments..."

ActiveRecord::Base.transaction do  
  60.times do
    user = User.order("RANDOM()").first
    collection_comment = user.collection_comments.build(body: Faker::Lorem.paragraph)
    collection_comment.collection = Collection.order("RANDOM()").first
    collection_comment.save
  end
end

puts "Creating liked collections..."

ActiveRecord::Base.transaction do
  count = 40
  userCount = User.count
  collectionCount = Collection.count

  while count > 0
    user = User.offset(rand(userCount)).first
    collection = Collection.offset(rand(collectionCount)).first

    if collection.user != user
      user.liked_collections << collection  
      count -= 1
    end    
  end
end

# ActiveRecord::Base.transaction do
#   count = 40

#   while count > 0
#     user = User.order("RANDOM()").first
#     collection = Collection.order("RANDOM()").first

#     dummy_collection = []

#     if collection.user == user
#       # Add the item to a collection if it's a duplicate, because otherwise
#       # order("RANDOM()") keeps selecting the same item and gets stuck in infinite loop
#       dummy_collection << collection
#     else
#       user.liked_collections << collection  
#       count -= 1
#     end    
#   end
# end