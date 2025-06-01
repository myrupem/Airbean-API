import mongoose from 'mongoose';
import product from 'product'

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    title : {
        type : String,
        required : true,
        maxlength : 15
    }, 
    text : {
        type : String,
        required : true,
        minlength : 15
    },
    cartId : {
        type : String,
        required : true,
        unique : true
    }, 
    userId : {
        type : String,
        required : true
    }
}, { timestamps : true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;