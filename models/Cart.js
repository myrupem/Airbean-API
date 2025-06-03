import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  items: [
    {
      prodId: { type: String, required: true },
      qty: { type: Number, required: true, min: 0 }
    }
  ]
});

export default mongoose.model('Cart', cartSchema);
