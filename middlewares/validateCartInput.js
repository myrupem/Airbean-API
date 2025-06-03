// middlewares/validateCartInput.js
import Menu from '../models/Menu.js';

export const validateCartInput = async (req, res, next) => {
  const { prodId, qty } = req.body;

  if (!prodId || typeof qty !== 'number') {
    return res.status(400).json({ success: false, message: 'Missing or invalid prodId/qty' });
  }

  const exists = await Menu.findOne({ prodId });
  if (!exists) {
    return res.status(400).json({ success: false, message: 'Product does not exist in menu' });
  }

  if (qty < 0) {
    return res.status(400).json({ success: false, message: 'Quantity must be >= 0' });
  }

  next();
};
