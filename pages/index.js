import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    // Load cart count
    const cart = JSON.parse(Cookies.get('cart') || '{}');
    setCartCount(Object.values(cart).reduce((a, b) => a + b, 0));
  }, []);

  const addToCart = async (productId) => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, action: 'add' }),
    });
    const cart = JSON.parse(Cookies.get('cart') || '{}');
    setCartCount(Object.values(cart).reduce((a, b) => a + b, 0));
  };

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Link href="/cart">
        <a className="cart-link">View Cart ({cartCount})</a>
      </Link>
    </div>
  );
}
