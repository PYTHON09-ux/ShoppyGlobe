import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';
import CartItem from './CartItem';
import { ShoppingBag, ChevronRight, Trash2 } from 'lucide-react';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center">
          <ShoppingBag size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <button 
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <Trash2 size={18} className="mr-1" />
          Clear Cart
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 lg:mb-0">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-700">Cart Items ({cartItems.length})</h2>
            </div>
            
            <div className="divide-y">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium text-gray-700">Order Summary</h2>
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
              
              <Link
                to="/checkout"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ChevronRight size={18} className="ml-1" />
              </Link>
              
              <Link
                to="/"
                className="w-full text-center block mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;