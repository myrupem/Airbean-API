import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  prodId: String,
  name: String,
  price: Number,
  qty: Number,
});

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
