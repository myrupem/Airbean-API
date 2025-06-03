// services/order.js
import Order from "../models/order.js";

export async function getOrdersByUserId(userId) {
  try {
    return await Order.find({ userId });
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    return null;
  }
}
