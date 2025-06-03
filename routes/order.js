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

router.post("/", async (req, res) => {
    const cartId = req.body

    try {
    let cart = await Cart.findOne({ cartId : cartId })

        if(cart) {
            //Create an order and return the order back in the response
        } else {
            res.status(404).json({
                success : false,
                message : "Something went wrong with cart"
            })
        }
    }
});

export default router;