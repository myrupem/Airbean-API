import express from 'express';
import { updateCart } from '../controllers/cartController.js';
import { validateCartInput } from '../middlewares/validateCartInput.js';

const router = express.Router();

router.put('/', validateCartInput, updateCart);

export default router;
