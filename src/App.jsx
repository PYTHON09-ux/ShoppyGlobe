import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Header from './components/Header';
import Loading from './components/Loading';

// Lazy loaded components
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const Cart = React.lazy(() => import('./components/Cart'));
const Checkout = React.lazy(() => import('./components/Checkout.jsx'));
const NotFound = React.lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;