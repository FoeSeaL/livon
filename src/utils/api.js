import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (category = '') => {
  try {
    const response = await axios.get(
      category 
        ? `${API_BASE_URL}/category/${category}` 
        : API_BASE_URL
    );
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