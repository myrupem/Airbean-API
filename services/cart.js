import Cart from '../models/cart.js';

export async function getOrCreateCart(userId) {
    try {
        let cart = await Cart.findOne({ cartId : userId });
        if(!cart) {
            cart = await Cart.create({
                cartId : userId,
                items : []
            });
        }
        return cart;
    }catch(error) {
        console.log('Something went wrong!');
        console.log(error.message);
        return null;
    }
}