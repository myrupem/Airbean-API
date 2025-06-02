import { Router } from "express";
import { getOrdersByUserId } from "../services/order.js";

const router = Router();

router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  console.log(`Fetching orders for user ID: ${userId}`);
  const orders = await getOrdersByUserId(userId);

  if (orders) {
    res.json({ success: true, orders });
  } else {
    next({
      status: 404,
      message: "No orders found for this user",
    });
  }
});

export default router;
