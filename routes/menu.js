const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../services/products");

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving menu", error: error.message });
  }
});

module.exports = router;
