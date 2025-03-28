import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await fetchProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error loading product:', error);
      }
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-2xl py-16">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center text-2xl py-16">Product not found</div>;
  }

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div>
        <img 
          src={product.images[selectedImage]} 
          alt={product.title} 
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${product.title} view ${index + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer ${
                selectedImage === index ? 'border-4 border-brand-primary' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-2xl font-semibold text-brand-primary mr-4">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-yellow-500">
            {product.rating} ★
          </span>
        </div>

        <div className="mb-4">
          <span className="font-semibold">Brand:</span> {product.brand}
        </div>

        <div className="mb-4">
          <span className="font-semibold">Category:</span> {product.category}
        </div>

        <div className="mb-6">
          <span className="font-semibold">Stock:</span> {product.stock} available
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;