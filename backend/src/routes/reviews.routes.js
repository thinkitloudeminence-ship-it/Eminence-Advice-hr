const express = require('express');
const router = express.Router();
const axios = require('axios');

// Google Places API - Get reviews
router.get('/google', async (req, res) => {
  try {
    // Google Place ID for your business
    const placeId = 'ChIJN6xKq1sTqEcR7ZGW5oG9z4M'; // Replace with your actual Place ID
    
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`
    );
    
    const reviews = response.data.result?.reviews || [];
    const formattedReviews = reviews.map(review => ({
      name: review.author_name,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toLocaleDateString(),
      avatar: review.profile_photo_url || `https://ui-avatars.com/api/?name=${review.author_name}&background=ff6b35&color=fff`
    }));
    
    res.json({
      rating: response.data.result?.rating || 0,
      totalReviews: response.data.result?.user_ratings_total || 0,
      reviews: formattedReviews
    });
  } catch (error) {
    console.error('Google Reviews fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;