import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { useProductDetails } from '../hooks/useProduct';
import { addToCart } from '../redux/cartSlice';
import { 
  ShoppingCart, 
  ChevronLeft, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';


const handleBuyNow = () => {
    const cartItems = useSelector((state) => state.cart.items); 
    const isInCart = cartItems.some(item => item.id === product.id);

    if (!isInCart) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        brand: product.brand
      }));
    }

    navigate("/Checkout");
  };


const ProductDetail = () => {
  const { id } = useParams();
  const { product, status, error } = useProductDetails(id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        brand: product.brand
      }));
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
        <p>{error}</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
          Return to product list
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ChevronLeft size={20} />
        <span>Back to Products</span>
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="relative pb-[75%]">
              <img 
                src={product.thumbnail} 
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-contain p-4"
              />
            </div>
            
            {/* Image Gallery */}
            <div className="p-4 flex space-x-2 overflow-x-auto">
              {product.images && product.images.map((image, index) => (
                <div key={index} className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover rounded-md border-2 border-gray-200 hover:border-indigo-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 p-6">
            <div className="uppercase text-indigo-600 text-sm font-bold tracking-wider mb-1">
              {product.brand}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating} rating</span>
            </div>
            
            <div className="text-2xl font-bold text-gray-900 mb-4">
              ${product.price}
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-green-600 font-normal">
                  {product.discountPercentage}% off
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Truck size={18} className="text-indigo-600 mr-2" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center mb-2">
                <ShieldCheck size={18} className="text-indigo-600 mr-2" />
                <span className="text-gray-700">2 year warranty</span>
              </div>
              <div className="flex items-center">
                <RefreshCw size={18} className="text-indigo-600 mr-2" />
                <span className="text-gray-700">30-day return policy</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              
              <Link to="/Checkout" >
              <button onClick={handleBuyNow} className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Buy Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;