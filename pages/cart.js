import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load cart
    const cartData = JSON.parse(document.cookie.replace('cart=', '') || '{}');
    setCart(cartData);

    // Load products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const removeItem = async (productId) => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, action: 'remove' }),
    });
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    return sum + (product?.price || 0) * qty;
  }, 0);

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty. <Link href="/">Shop now</Link></p>
      ) : (
        <>
          <div className="cart-items">
            {products.filter(p => cart[p.id]).map(product => (
              <div key={product.id} className="cart-item">
                <h3>{product.name}</h3>
                <p>${product.price} × {cart[product.id]}</p>
                <button onClick={() => removeItem(product.id)}>Remove</button>
              </div>
            ))}
          </div>
          <p>Total: ${total.toFixed(2)}</p>
          <Link href="/checkout">
            <a className="checkout-button">Proceed to Checkout</a>
          </Link>
        </>
      )}
    </div>
  );
}
