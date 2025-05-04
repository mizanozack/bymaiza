import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const products = [
  { id: 1, name: "Product A", price: 29.99 },
  { id: 2, name: "Product B", price: 49.99 },
  { id: 3, name: "Product C", price: 19.99 },
];

export default function BymaizaCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const getTotal = () => {
    return cart.reduce((sum, product) => sum + product.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert(`Checked out. Total: $${getTotal()}`);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-khaki p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Bymaiza.cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mb-2">${product.price}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        )}
        <p className="font-semibold mb-2">Total: ${getTotal()}</p>
        <Button onClick={handleCheckout} disabled={cart.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
