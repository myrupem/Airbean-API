import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  prodId: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
});

export default mongoose.model("Product", productSchema, "products");
