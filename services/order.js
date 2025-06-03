// services/order.js
import Order from "../models/order.js";
import Cart from "../models/cart.js";

// Get all orders
export async function getAllOrders() {
  try {
    console.log("Fetching all orders from the database");
    return await Order.find({});
  } catch (error) {
    console.error("Error fetching all orders:", error.message);
    return null;
  }
}

// Get orders by user ID
export async function getOrderByUserId(userId) {
  try {
    return await Order.find({ userId });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    return null;
  }
}

// Create a new order

export async function createOrder(cartId) {
  try {
    let cart = await Cart.findOne({ cartId: cartId });
    console.log("Cart found: in", cart);
    if (!cart) {
      console.error("Cart not found or is empty for cartId:", cartId);
      throw new Error("Cart not found or is empty");
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    console.log("userId", cart.userId);

    const newOrder = new Order({
      orderId: `order-${Math.random().toString(36).substr(2, 9)}`,
      userId: cart.userId,
      items: cart.items,
      total,
    });

    return await newOrder.save();
  } catch (error) {
    console.error("Error creating order:", error.message);
    throw error;
  }
}
