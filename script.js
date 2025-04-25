document.addEventListener('DOMContentLoaded', function() {
    const productListDiv = document.getElementById('product-list');
    const orderSummaryDiv = document.getElementById('order-summary');
    const placeOrderBtn = document.getElementById('place-order-btn');
    let order = {};
    const products = [
        { id: 1, name: 'Laptop', price: 1200 },
        { id: 2, name: 'Mouse', price: 25 },
        { id: 3, name: 'Keyboard', price: 75 }
    ];

    // Function to display products
    function displayProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <label for="quantity-${product.id}">${product.name} ($${product.price}):</label>
                <input type="number" id="qty-${product.id}" name="qty-${product.id}" value="0" min="0">
            `;
            productListDiv.appendChild(productDiv);

            const quantityInput = productDiv.querySelector(`#qty-${product.id}`);
            quantityInput.addEventListener('change', function() {
                order[product.id] = { name: product.name, price: product.price, quantity: parseInt(this.value) };
                updateOrderSummary();
            });
        });
    }

    // Function to update the order summary
    function updateOrderSummary() {
        let summaryHTML = '';
        let total = 0;
        let itemCount = 0;

        for (const productId in order) {
            if (order.hasOwnProperty(productId) && order[productId].quantity > 0) {
                const item = order[productId];
                const itemTotal = item.price * item.quantity;
                summaryHTML += `<p>${item.name} x ${item.quantity} = $${itemTotal}</p>`;
                total += itemTotal;
                itemCount += item.quantity;
            }
        }

        if (itemCount > 0) {
            summaryHTML += `<hr><strong>Total: $${total}</strong>`;
        } else {
            summaryHTML = '<p>Your cart is empty.</p>';
        }
        orderSummaryDiv.innerHTML = summaryHTML;
    }

    // Event listener for the Place Order button
    placeOrderBtn.addEventListener('click', function() {
        let orderDetails = 'Order Details:\n';
        let total = 0;
        for (const productId in order) {
            if (order.hasOwnProperty(productId) && order[productId].quantity > 0) {
                const item = order[productId];
                const itemTotal = item.price * item.quantity;
                orderDetails += `${item.name} x ${item.quantity} = $${itemTotal}\n`;
                total += itemTotal;
            }
        }
        orderDetails += `\nTotal: $${total}`;
        alert(orderDetails);
    });

    displayProducts();

    const savedOrder = localStorage.getItem('currentOrder');
if (savedOrder) {
  order = JSON.parse(savedOrder);
  // Update quantities in the UI
  for (const productId in order) {
    if (order[productId].quantity > 0) {
      document.getElementById(`qty-${productId}`).value = order[productId].quantity;
    }
  }

    quantityInput.addEventListener('change', function() {
  order[product.id] = { 
    name: product.name, 
    price: product.price, 
    quantity: parseInt(this.value) || 0 
  };
  localStorage.setItem('currentOrder', JSON.stringify(order));
  updateOrderSummary();
}
});
