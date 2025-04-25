export default function handler(req, res) {
  const products = [
    { id: 1, name: 'Coffee', price: 12.99 },
    { id: 2, name: 'Headphones', price: 89.99 },
  ];
  res.status(200).json(products);
}
