import express from 'express';
import getAllCategory from '../controllers/category/getAllCategory.controller';

const router = express.Router();

router.get('/', getAllCategory);
router.post('/', getAllCategory);

export default router;
