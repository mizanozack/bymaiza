export default function Cart({ cartItems, updateQuantity, proceedToCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h4>{item.name}</h4>
              <input 
                type="number" 
                min="1" 
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={proceedToCheckout}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
}
