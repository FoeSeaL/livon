import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, calculateTotal } = useCart();

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
            <CartItem key={item.id} item={item} />
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