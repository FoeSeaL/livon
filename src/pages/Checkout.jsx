import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, calculateTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'address', 
      'city', 'zipCode', 'cardNumber', 'expiryDate', 'cvv'
    ];
    
    const isValid = requiredFields.every(field => formData[field].trim() !== '');

    if (isValid) {
      // Simulate order processing
      alert('Order placed successfully!');
      // Clear cart and redirect to home
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-primary text-white p-3 rounded-full hover:bg-opacity-90"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-16 h-16 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-4 text-right">
            <h3 className="text-2xl font-bold">
              Total: ${calculateTotal()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;