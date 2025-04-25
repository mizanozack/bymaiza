

html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Order App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Our Products</h1>
        <div id="product-list">
            </div>
        <h2>Your Order</h2>
        <div id="order-summary">
            <p>Your cart is empty.</p>
        </div>
        <button id="place-order-btn">Place Order</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
css
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #C3B091; /* Khaki background */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h1, h2 {
    text-align: center;
    color: #333;
    font-weight: 300;
    margin-top: 0;
}

h1 {
    margin-bottom: 30px;
}

h2 {
    margin-top: 30px;
    margin-bottom: 15px;
}

.product-item {
    padding: 12px 0;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
}

.product-item:last-child {
    border-bottom: none;
}

.product-item label {
    margin-right: 10px;
    color: #555;
}

input[type="number"] {
    width: 60px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
}

#place-order-btn {
    background-color: #8B966A; /* Earthy green */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    display: block;
    margin: 30px auto 0;
    width: 100%;
    max-width: 200px;
    transition: background-color 0.2s;
}

#place-order-btn:hover {
    background-color: #7A8560;
}

#order-summary {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 3px;
    background-color: #fafafa;
}

#order-summary p {
    margin: 5px 0;
    color: #555;
}

hr {
    border: none;
    border-top: 1px solid #eee;
    margin: 10px 0;
}

strong {
    color: #333;
}


javascript
// Load saved order from localStorage
const savedOrder = localStorage.getItem('currentOrder');
if (savedOrder) {
  order = JSON.parse(savedOrder);
  // Update quantities in the UI
  for (const productId in order) {
    if (order[productId].quantity > 0) {
      document.getElementById(`qty-${productId}`).value = order[productId].quantity;
    }
  }
  updateOrderSummary();
}
Modify the quantity change event listener to save to localStorage:

javascript
quantityInput.addEventListener('change', function() {
  order[product.id] = { 
    name: product.name, 
    price: product.price, 
    quantity: parseInt(this.value) || 0 
  };
  localStorage.setItem('currentOrder', JSON.stringify(order));
  updateOrderSummary();
});
2. Add Confirmation Page
Create a new file confirmation.html:

html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Thank You!</h1>
        <div id="confirmation-details">
            <p>Your order has been placed successfully.</p>
            <div id="order-items"></div>
            <p>We'll process your order shortly.</p>
        </div>
        <a href="/" class="btn">Back to Shop</a>
    </div>
    <script src="confirmation.js"></script>
</body>
</html>
Create confirmation.js:

javascript
document.addEventListener('DOMContentLoaded', function() {
    const orderItemsDiv = document.getElementById('order-items');
    const order = JSON.parse(localStorage.getItem('currentOrder') || '{}');
    let total = 0;
    let hasItems = false;

    for (const productId in order) {
        if (order[productId].quantity > 0) {
            hasItems = true;
            const item = order[productId];
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            orderItemsDiv.innerHTML += `
                <p>${item.name} x ${item.quantity} = $${itemTotal}</p>
            `;
        }
    }

    if (hasItems) {
        orderItemsDiv.innerHTML += `<hr><strong>Total: $${total}</strong>`;
    } else {
        orderItemsDiv.innerHTML = '<p>No items in this order.</p>';
    }

    // Clear the order after confirmation
    localStorage.removeItem('currentOrder');
});
Modify the place order button in script.js:

javascript
placeOrderBtn.addEventListener('click', function() {
    let hasItems = false;
    for (const productId in order) {
      if (order[productId].quantity > 0) {
        hasItems = true;
        break;
      }
    }
    
    if (hasItems) {
      // Save order to localStorage
      localStorage.setItem('currentOrder', JSON.stringify(order));
      // Use absolute path
      window.location.href = '/confirmation.html';
    } else {
      alert('Please add items to your cart before placing an order.');
    }
  });
3. Mobile-Friendly Tweaks
Add these to your style.css:

css
/* Mobile responsiveness */
@media (max-width: 600px) {
    .container {
        padding: 15px;
        margin: 10px;
        width: auto;
    }

    .product-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .product-item label {
        margin-bottom: 8px;
    }

    input[type="number"] {
        width: 100%;
    }

    #place-order-btn {
        width: 100%;
        max-width: none;
    }
}

/* Additional mobile styles */
.btn {
    display: block;
    text-align: center;
    background-color: #8B966A;
    color: white;
    padding: 12px;
    border-radius: 3px;
    text-decoration: none;
    margin-top: 20px;
}

.btn:hover {
    background-color: #7A8560;
}
4. Updated File Structure
Your project should now have:

/
├── index.html
├── confirmation.html
├── style.css
├── script.js
└── confirmation.js



