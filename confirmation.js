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