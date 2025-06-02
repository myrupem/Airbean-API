import { Router } from 'express';
import { getOrCreateCart } from '../services/cart.js';

const router = Router();

// GET cart by cartID
router.get('/:cartId', async (req, res, next) => {
    const { cartId } = req.params;
    const cart = await getOrCreateCart(cartId);
    if(cart) {
        res.json({
            success : true,
            cart : cart
        });
    } else {
        next({
            status : 404,
            message : 'No cart found!'
        });
    }
});

export default router;