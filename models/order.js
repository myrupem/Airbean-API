const moongose = require("mongoose");

const orderSchema = new moongose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  items: [
    {
      prodId: String,
      title: String,
      price: Number,
      qty: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
