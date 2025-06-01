const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  prodId: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema, "products");
