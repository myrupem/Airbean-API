import Cart from "../models/cart.js";
import { v4 as uuidv4 } from "uuid";

export async function getOrCreateCart(cartId) {
  try {
    let cart = await Cart.findOne({ cartId: cartId });
    if (!cart) {
      cart = await Cart.create({
        cartId: cartId,
        userId: `guest-${uuidv4()}`,
        items: [],
      });
    }
    return cart;
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error.message);
    return null;
  }
}

export const updateCart = async (req, res, next) => {
  try {
    const { prodId, qty, guestId } = req.body;
    const userId = global.user?.userId || guestId || `guest-${uuidv4()}`;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        cartId: `cart-${uuidv4()}`,
        userId: `guest-${uuidv4()}`,
        items: [],
      });
    }

    const index = cart.items.findIndex((item) => item.prodId === prodId);

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
