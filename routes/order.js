const express = require("express");
const router = express.Router();
const { validateUserAuth } = require("../middleware/auth");
const { getOrdersByUserId } = require("../services/orders");

// GET /api/orders/{userId}
router.get("/:userId", validateUserAuth, async (req, res) => {
  try {
    const userId = req.params;
    const orders = getOrdersByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Order history retrieved successfully",
      data: {
        userId,
        orders,
        totalOrders: orders.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving order history",
      error: error.message,
    });
  }
});

module.exports = router;
