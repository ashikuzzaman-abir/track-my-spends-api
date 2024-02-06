import express from 'express';
import { protect, user } from '../middlewares/auth';
import createCategory from '../controllers/category/createCategory.controller';

const router = express.Router();

router.post('/', user, createCategory);

export default router;
