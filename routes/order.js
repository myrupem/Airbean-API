import { Router } from "express";
import {
  getOrderByUserId,
  createOrder,
  getAllOrders,
} from "../services/order.js";
import { getOrCreateCart } from "../services/cart.js";

const router = Router();

// GET all orders - /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    if (orders && orders.length > 0) {
      res.json({
        success: true,
        orders,
        count: orders.length,
      });
    } else {
      next({
        status: 404,
        message: "No orders found",
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: "Error fetching orders",
      error: error.message,
    });
  }
});

// GET orders by user ID - /api/orders/:userId
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  console.log(`Fetching orders for user ID: ${userId}`);

  const orders = await getOrderByUserId(userId);
  if (orders && orders.length > 0) {
    res.json({ success: true, orders });
  } else {
    next({
      status: 404,
      message: "No orders found for this user",
    });
  }
});

// POST create order - /api/orders
router.post("/", async (req, res, next) => {
  const { cartId } = req.body;

  try {
    console.log(`Received request to create order for cart ID: ${cartId}`);

    const cart = await getOrCreateCart(cartId);

    const order = await createOrder(cart.cartId);

    if (order && order._id) {
      res.json({ success: true, order });
    } else {
      next({
        status: 500,
        message: "Order creation failed",
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: "Error creating order",
      error: error.message + "eeee",
    });
  }
});

export default router;
