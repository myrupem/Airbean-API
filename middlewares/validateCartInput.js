import validProducts from '../data/menu.json' assert { type: 'json' };

export const validateCartInput = (req, res, next) => {
  const { prodId, qty } = req.body;

  if (!prodId || typeof qty !== 'number') {
    return res.status(400).json({ success: false, message: 'Missing or invalid prodId/qty' });
  }

  const isValidProduct = validProducts.some(p => p.prodId === prodId);
  if (!isValidProduct) {
    return res.status(400).json({ success: false, message: 'Product does not exist in menu' });
  }

  if (qty < 0) {
    return res.status(400).json({ success: false, message: 'Quantity must be >= 0' });
  }

  next();
};
