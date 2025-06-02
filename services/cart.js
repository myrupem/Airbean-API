import Cart from '../models/cart.js';

export async function getCartByCartId(cartId) {
    try {
        const cart = await Cart.find({ cartId : cartId})
        if(cart.length < 1) throw new Error('No cart found');
        else return cart;
    } catch(error) {
        console.log(error.message);
        return null;
    }
}