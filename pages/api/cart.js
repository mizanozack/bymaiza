import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, action } = req.body;
    const cart = JSON.parse(req.cookies.cart || '{}');

    if (action === 'add') {
      cart[productId] = (cart[productId] || 0) + 1;
    } else if (action === 'remove') {
      delete cart[productId];
    }

    res.setHeader('Set-Cookie', serialize('cart', JSON.stringify(cart), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }));
    return res.status(200).json(cart);
  }

  res.status(405).end(); // Method not allowed
}
