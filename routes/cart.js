import { updateCart } from '../services/cart.js';
import { validateCartInput, validateCartInUrl } from '../middlewares/validators.js';
import { Router } from 'express';
import { getCart } from '../services/cart.js';

const router = Router();

// GET cart by cartId
router.get('/:cartId', validateCartInUrl, async (req, res, next) => {
    const { cartId } = req.params;
    const cart = await getCart(cartId);
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

// PUT cart
router.put('/', validateCartInput, updateCart);


export default router;