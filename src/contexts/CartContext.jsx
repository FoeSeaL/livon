import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists
      const existingProduct = prevItems.find(item => item.id === product.id);
      
      if (existingProduct) {
        return prevItems.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      
      // Add new product
      return [...prevItems, {...product, quantity: 1}];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? {...item, quantity: newQuantity}
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    ).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);