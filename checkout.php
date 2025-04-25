<?php require 'functions.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Checkout</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Checkout</h1>
    <?php if (empty(getCartItems())): ?>
        <p>Your cart is empty. <a href="index.php">Shop now</a></p>
    <?php else: ?>
        <h2>Order Summary</h2>
        <ul>
            <?php foreach (getCartItems() as $item): ?>
                <li>
                    <?= $item['quantity'] ?> x <?= htmlspecialchars($item['name']) ?> 
                    ($<?= number_format($item['subtotal'], 2) ?>)
                </li>
            <?php endforeach; ?>
        </ul>
        <p><strong>Total: $<?= number_format(getCartTotal(), 2) ?></strong></p>

        <form method="post" action="process_payment.php">
            <h2>Payment Information</h2>
            <input type="text" name="card_number" placeholder="Card Number" required>
            <input type="text" name="expiry" placeholder="MM/YY" required>
            <input type="text" name="cvv" placeholder="CVV" required>
            <button type="submit">Pay Now</button>
        </form>
    <?php endif; ?>
</body>
</html>
