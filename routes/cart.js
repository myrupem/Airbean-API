import { updateCart } from '../services/cart.js';
import { validateCartInput } from '../middlewares/validateCartInput.js';
import { Router } from 'express';
import { getCart } from '../services/cart.js';

const router = Router();

// GET cart by cartId
router.get('/:cartId', async (req, res, next) => {
    const { cartId } = req.params;
    const cart = await getCart(cartId);

    if (!cart) {
        next({
        status: 404,
        message: 'No cart found!'
        });
    } else {
        res.json({
        success: true,
        cart: cart
        });
    }
});

// PUT cart
router.put('/', validateCartInput, updateCart);


export default router;