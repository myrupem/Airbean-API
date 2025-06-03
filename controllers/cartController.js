import Cart from '../models/Cart.js';
import { v4 as uuidv4 } from 'uuid';

export const updateCart = async (req, res, next) => {
  try {
    const { prodId, qty, guestId } = req.body;
    const userId = global.user?.userId || guestId || `guest-${uuidv4()}`;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        cartId: `cart-${uuidv4()}`,
        userId,
        items: []
      });
    }

    const index = cart.items.findIndex(item => item.prodId === prodId);

    if (qty === 0) {
      if (index !== -1) cart.items.splice(index, 1);
    } else {
      if (index !== -1) {
        cart.items[index].qty = qty;
      } else {
        cart.items.push({ prodId, qty });
      }
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};
