// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const MONGO_URL = 'mongodb://127.0.0.1:27017/restaurants';

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  imageUrl: String,
  address: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// API: Get all restaurants (supports search across name/cuisine/address, cuisine filter, minRating)
app.get('/restaurants', async (req, res) => {
  try {
    const { search, cuisine, minRating } = req.query;
    const query = {};

    if (search && String(search).trim() !== '') {
      const regex = { $regex: String(search).trim(), $options: 'i' };
      query.$or = [
        { name: regex },
        { cuisine: regex },
        { address: regex },
      ];
    }

    if (cuisine && String(cuisine).trim() !== '') {
      query.cuisine = String(cuisine).trim();
    }

    if (minRating !== undefined && String(minRating) !== '') {
      const min = Number(minRating);
      if (!isNaN(min)) {
        query.rating = { $gte: min };
      }
    }

    const restaurants = await Restaurant.find(query).limit(500);
    res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API: Add restaurant (optional)
app.post('/restaurants', async (req, res) => {
  try {
    const r = new Restaurant(req.body);
    await r.save();
    res.json(r);
  } catch (err) {
    console.error('Error saving restaurant:', err);
    res.status(500).json({ error: 'Could not save' });
  }
});

// Start function — connect to Mongo first, then start Express
async function start() {
  try {
    // Note: do NOT pass legacy options here — let mongoose use defaults
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server — DB connect error:', err);
    process.exit(1);
  }
}

start();

// Export model if needed elsewhere
module.exports = { Restaurant };
