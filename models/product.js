import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;