import axios from 'axios';

const API_URL = 'https://api-beli-galon.vercel.app/api';

export const fetchReview = async (sellerId: string) => {
  try {
    const reviews = await axios.get(`${API_URL}/users/reviews/${sellerId}`);
    return reviews.data;
  } catch (error) {
    console.error('Error in fetchReview API call:', error);
    throw new Error('Failed to fetch reviews');
  }
};
