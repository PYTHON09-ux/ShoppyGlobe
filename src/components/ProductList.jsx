import React, { useState } from 'react';
import { useProducts } from '../hooks/useProduct';
import ProductItem from './ProductItem';
import { Search, FilterX } from 'lucide-react';

const ProductList = () => {
  const { filteredProducts, status, error, searchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    searchProducts('');
  };

  // Get unique categories
  const categories = [...new Set(filteredProducts.map(product => product.category))];

  // Filter by category
  const productsByCategory = category 
    ? filteredProducts.filter(product => product.category === category) 
    : filteredProducts;

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
        <h2 className="text-2xl font-bold mb-2">Error Loading Products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchTerm && (
              <button 
                type="button" 
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FilterX size={20} />
              </button>
            )}
          </div>
          <button 
            type="submit" 
            className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button 
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            category === '' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === cat 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsByCategory.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* No Products Found */}
      {productsByCategory.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;