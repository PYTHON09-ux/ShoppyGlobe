import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProducts, 
  fetchProductById,
  selectAllProducts, 
  selectFilteredProducts,
  selectProductById,
  selectProductsStatus, 
  selectProductsError,
  setSearchTerm 
} from '../redux/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const searchProducts = (term) => {
    dispatch(setSearchTerm(term));
  };

  return {
    products,
    filteredProducts,
    status,
    error,
    searchProducts
  };
};

export const useProductDetails = (productId) => {
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  return { product, status, error };
};