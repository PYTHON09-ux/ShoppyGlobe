import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Check } from 'lucide-react';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process payment here
    setOrderPlaced(true);
  };
  
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received.</p>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products to your cart before checkout.</p>
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Link to="/cart" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ChevronLeft size={20} />
        <span>Back to Cart</span>
      </Link>
      
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden mb-6 lg:mb-0">
            {/* Shipping Information */}
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Payment Information</h2>
              
              <div className="mb-4 flex items-center">
                <CreditCard size={24} className="text-indigo-600 mr-2" />
                <span className="text-gray-700">Credit Card</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="XXX"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-700">Order Summary</h2>
            </div>
            
            <div className="p-4 max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex py-2 border-b">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="border-t my-4"></div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
              
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;