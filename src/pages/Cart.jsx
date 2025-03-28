import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useCart();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl">Your cart is empty</p>
          <Link 
            to="/products" 
            className="mt-4 inline-block bg-brand-primary text-white px-6 py-2 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
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
          ))}
          
          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold">
              Total: ${calculateTotal()}
            </h2>
            <Link 
              to="/checkout"
              className="mt-4 inline-block bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;