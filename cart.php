<?php
require 'functions.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $productId = $_POST['product_id'] ?? 0;
    $quantity = $_POST['quantity'] ?? 1;

    switch ($action) {
        case 'add':
            addToCart($productId, $quantity);
            break;
        case 'remove':
            removeFromCart($productId);
            break;
        case 'update':
            if ($quantity > 0) {
                $_SESSION['cart'][$productId] = $quantity;
            } else {
                removeFromCart($productId);
            }
            break;
    }
    header('Location: cart.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Cart</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Your Shopping Cart</h1>
    <?php if (empty(getCartItems())): ?>
        <p>Your cart is empty.</p>
    <?php else: ?>
        <table>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
            </tr>
            <?php foreach (getCartItems() as $item): ?>
            <tr>
                <td><?= htmlspecialchars($item['name']) ?></td>
                <td>$<?= number_format($item['price'], 2) ?></td>
                <td>
                    <form method="post">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" name="product_id" value="<?= $item['id'] ?>">
                        <input type="number" name="quantity" value="<?= $item['quantity'] ?>" min="1">
                        <button type="submit">Update</button>
                    </form>
                </td>
                <td>$<?= number_format($item['subtotal'], 2) ?></td>
                <td>
                    <form method="post">
                        <input type="hidden" name="action" value="remove">
                        <input type="hidden" name="product_id" value="<?= $item['id'] ?>">
                        <button type="submit">Remove</button>
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
            <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td>$<?= number_format(getCartTotal(), 2) ?></td>
                <td></td>
            </tr>
        </table>
        <a href="checkout.php">Proceed to Checkout</a>
    <?php endif; ?>
    <a href="index.php">Continue Shopping</a>
</body>
</html>
