import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (category = '') => {
  try {
    let url = API_BASE_URL;
    
    // If a category is provided, adjust the URL to match DummyJSON's API
    if (category) {
      // Convert category to lowercase and handle special cases
      const formattedCategory = category.toLowerCase() === 'skincare' 
        ? 'skincare'  // Ensure exact match
        : category;
      
      url = `${API_BASE_URL}/category/${formattedCategory}`;
    }

    const response = await axios.get(url);
    return response.data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};