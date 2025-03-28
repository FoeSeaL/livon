import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div 
      key={item.id} 
      className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4"
    >
      <div className="flex items-center">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-20 h-20 object-cover mr-4 rounded"
        />
        <div>
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="bg-gray-200 px-3 py-1 rounded-l"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 px-3 py-1 rounded-r"
        >
          +
        </button>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;