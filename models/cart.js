import mongoose from 'mongoose';
import productSchema from '../models/product.js';

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  cartId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  products: {
    type: [productSchema],
    default: []
  }
});

const cartSchema = new Schema({
  carts: [cartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;