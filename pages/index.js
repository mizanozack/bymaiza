import { useState } from 'react';
import { products } from '../data/products';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

export default function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutStage, setCheckoutStage] = useState('browse'); // 'browse' or 'checkout'

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing 
        ? prev.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  return (
    <main>
      {checkoutStage === 'browse' ? (
        <>
          <h1>Our Products</h1>
          <ProductList products={products} addToCart={addToCart} />
          <Cart 
            cartItems={cartItems} 
            updateQuantity={updateQuantity}
            proceedToCheckout={() => setCheckoutStage('checkout')}
          />
        </>
      ) : (
        <div className="checkout">
          <h1>Checkout</h1>
          {/* Payment form would go here */}
          <button onClick={() => setCheckoutStage('browse')}>Back to Cart</button>
        </div>
      )}
    </main>
  );
}
