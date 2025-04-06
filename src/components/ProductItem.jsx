import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      brand: product.brand
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative pb-[56.25%]">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 text-xs rounded-md">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{product.title}</h3>
          <span className="font-bold text-indigo-600">${product.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">Brand: {product.brand}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Link 
            to={`/product/${product.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
          >
            <span>View Details</span>
            <ExternalLink size={14} className="ml-1" />
          </Link>
          
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center text-sm"
          >
            <ShoppingCart size={16} className="mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;