const order = require("../models/order");

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw new Error("Error getting order history");
  }
};
module.exports = { getOrdersByUserId };
