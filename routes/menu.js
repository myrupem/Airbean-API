import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// GET /api/menu
router.get('/', async (req, res, next) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    next(err);
  }
});

export default router;
