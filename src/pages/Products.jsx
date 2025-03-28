import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { fetchProducts } from '../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Possible categories from DummyJSON
  const categories = [
    'smartphones', 
    'laptops', 
    'fragrances', 
    'skincare', 
    'groceries', 
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses'
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');

    const loadProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts(category);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
      setLoading(false);
    };

    loadProducts();
  }, [location.search]);

  // Apply filters whenever search term, price filter, or category filter changes
  useEffect(() => {
    let result = products;

    // Search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter) {
      switch(priceFilter) {
        case 'low':
          result = result.filter(product => product.price < 50);
          break;
        case 'medium':
          result = result.filter(product => product.price >= 50 && product.price < 100);
          break;
        case 'high':
          result = result.filter(product => product.price >= 100);
          break;
        default:
          break;
      }
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter(product => 
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, priceFilter, categoryFilter, products]);

  if (loading) {
    return <div className="text-center text-2xl py-16">Loading products...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />

        {/* Category Filter */}
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <select 
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Prices</option>
          <option value="low">Under $50</option>
          <option value="medium">$50 - $100</option>
          <option value="high">Over $100</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl">No products found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-64 object-cover cursor-pointer"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {product.rating} ★ | {product.stock} in stock
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;