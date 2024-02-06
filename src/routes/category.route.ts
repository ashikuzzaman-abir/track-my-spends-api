import { admin, protect, user } from './../middlewares/auth';
import express from 'express';
import getAllCategory from '../controllers/category/getAllCategory.controller';
import createCategory from '../controllers/category/createCategory.controller';
import multer from '../middlewares/multer/multer.handler';

const router = express.Router();

router.get('/', user, getAllCategory);
router.post('/', multer.single('icon'), protect, createCategory);

export default router;
