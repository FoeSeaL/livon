import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div 
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
    >
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-64 object-cover cursor-pointer"
        />
      </Link>
      <div className="p-6">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-brand-primary">
            {product.title}
          </h2>
        </Link>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-brand-primary">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-yellow-500">
            {product.rating} ★
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;