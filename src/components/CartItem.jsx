import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };
  
  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="p-4 flex flex-col sm:flex-row">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-grow sm:ml-4 flex flex-col sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-500 mb-2">Brand: {item.brand}</p>
          <p className="text-indigo-600 font-medium">${item.price}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4 sm:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-md">
            <button 
              onClick={handleDecreaseQuantity}
              className="p-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            
            <span className="px-4">{item.quantity}</span>
            
            <button 
              onClick={handleIncreaseQuantity}
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Remove Button */}
          <button 
            onClick={handleRemoveItem}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;