const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/restaurants';

// avoid strictQuery warnings
mongoose.set('strictQuery', false);

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  imageUrl: String,
  address: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

async function seed() {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB for seeding');

    // Clear existing
    const beforeCount = await Restaurant.countDocuments();
    console.log(`Collection had ${beforeCount} documents. Deleting...`);
    await Restaurant.deleteMany({});

    const restaurants = [
      {
        name: "Bella Pizza",
        cuisine: "Italian",
        rating: 4.3,
        imageUrl: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1200",
        address: "MG Road, Downtown",
      },
      {
        name: "Mixed Curry",
        cuisine: "Indian",
        rating: 4.6,
        imageUrl: "https://www.awesomecuisine.com/wp-content/uploads/2009/05/Mixed-Vegetable-Curry.jpg",
        address: "Central Avenue",
      },
      {
        name: "Saffron Biryani",
        cuisine: "Indian",
        rating: 4.7,
        imageUrl: "https://b.zmtcdn.com/data/pictures/chains/6/19185706/907fcabf17b4ded67fecfcd08d8b3570.jpg",
        address: "Spice Street",
      },
      {
        name: "Sushi World",
        cuisine: "Japanese",
        rating: 4.5,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ542KCUjWhfaFMIfyw7WerTsyz_ZKcvkznYA&s",
        address: "Harbor Lane",
      },
      {
        name: "The Burger Barn",
        cuisine: "Fast Food",
        rating: 4.1,
        imageUrl: "https://static.spotapps.co/spots/fd/6c40fabc8c493a9305bb202fd165fb/full",
        address: "Market Plaza",
      },
      {
        name: "Green Bowl (Vegan)",
        cuisine: "Healthy",
        rating: 4.2,
        imageUrl: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1200",
        address: "Eco Park",
      },
      {
        name: "Spice Route",
        cuisine: "Thai",
        rating: 4.4,
        imageUrl: "https://www.distinctdestinations.in/DistinctDestinationsBackEndImg/downloads/SpiceRoute07.jpg",
        address: "Lotus Road",
      },
      {
        name: "Taco Town",
        cuisine: "Mexican",
        rating: 4.0,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYwftZShDyKbW6_j1SfRzw2ze5SrY50-33uQ&s",
        address: "Riverside",
      },
      {
        name: "Dolci (Desserts)",
        cuisine: "Desserts",
        rating: 4.6,
        imageUrl: "https://www.galbani.it/sites/default/files/styles/width_1920/public/2023-01/dolci_SHub_1280x595_Visual.jpg?itok=SQA-bm74",
        address: "Sweet Street",
      },
      {
        name: "Naan & Beyond",
        cuisine: "Indian",
        rating: 4.5,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKICbHGVPWKLN2yhVnWWF3Z8uurFBoi9VJSw&s",
        address: "Old Town",
      },
      {
        name: "Pasta Fresca",
        cuisine: "Italian",
        rating: 4.2,
        imageUrl: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200",
        address: "Riverwalk",
      },
      {
        name: "Cafe Mocha",
        cuisine: "Cafe",
        rating: 4.3,
        imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1200",
        address: "Sunset Boulevard",
      },
    ];

    const inserted = await Restaurant.insertMany(restaurants);
    console.log(`Inserted ${inserted.length} sample restaurants.`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
