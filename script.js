document.addEventListener('DOMContentLoaded', function() {
    const productListDiv = document.getElementById('product-list');
    const orderSummaryDiv = document.getElementById('order-summary');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const cartCount = document.getElementById('cart-count');
    let order = {};
    
    // Modern product data
    const products = [
        { id: 1, name: 'Wireless Headphones', price: 199 },
        { id: 2, name: 'Minimal Notebook', price: 24 },
        { id: 3, name: 'Desk Lamp', price: 85 },
        { id: 4, name: 'Ceramic Mug', price: 18 }
    ];

    // Display products
    function displayProducts() {
        productListDiv.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <label for="qty-${product.id}">${product.name}</label>
                <p class="price">$${product.price}</p>
                <input type="number" id="qty-${product.id}" value="0" min="0">
            `;
            productListDiv.appendChild(productDiv);

            const quantityInput = productDiv.querySelector(`#qty-${product.id}`);
            quantityInput.addEventListener('change', updateOrder);
        });
    }

    // Update order function
    function updateOrder() {
        let totalItems = 0;
        order = {};
        
        products.forEach(product => {
            const quantity = parseInt(document.getElementById(`qty-${product.id}`).value) || 0;
            if (quantity > 0) {
                order[product.id] = { 
                    name: product.name, 
                    price: product.price, 
                    quantity: quantity 
                };
                totalItems += quantity;
            }
        });
        
        updateOrderSummary();
        cartCount.textContent = totalItems;
    }

    // Modern order summary
    function updateOrderSummary() {
        let summaryHTML = '';
        let total = 0;
        
        for (const productId in order) {
            const item = order[productId];
            const itemTotal = item.price * item.quantity;
            summaryHTML += `
                <div class="order-item">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>$${itemTotal}</span>
                </div>
            `;
            total += itemTotal;
        }

        if (total > 0) {
            summaryHTML += `
                <div class="order-total">
                    <span>Total</span>
                    <span>$${total}</span>
                </div>
            `;
            placeOrderBtn.style.display = 'block';
        } else {
            summaryHTML = '<p>Your cart is empty</p>';
            placeOrderBtn.style.display = 'none';
        }
        
        orderSummaryDiv.innerHTML = summaryHTML;
    }

    // Place order with modern confirmation
    placeOrderBtn.addEventListener('click', function() {
        // Hide shop UI
        document.querySelector('main').innerHTML = `
            <section class="confirmation-view">
                <h2>order confirmed</h2>
                <p>Thank you for your purchase</p>
                ${orderSummaryDiv.innerHTML}
                <button onclick="window.location.reload()" class="back-btn">New Order</button>
            </section>
        `;
    });

    // Initialize
    displayProducts();
    updateOrderSummary();
});
