import { Router } from "express";

import {
  getOrderByUserId,
  createOrder,
  getAllOrders,
} from "../services/order.js";
import calculateTotal from "../utils/calculateTotal.js";

import Cart from "../models/cart.js";
import Order from "../models/order.js";
import { getCart } from "../services/cart.js";

import { validateCartInBody } from "../middlewares/validators.js";
import { validateUser } from "../middlewares/validators.js";

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
router.get("/:userId", validateUser, async (req, res, next) => {
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

router.post("/", validateCartInBody, async (req, res) => {
  const { cartId } = req.body;

  try {
    const cart = await Cart.findOne({ cartId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    // Skapa en order baserat på cart
    const order = await Order.create({
      userId: cart.userId,
      items: cart.items,
      total: calculateTotal(cart.items),
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
});

export default router;
