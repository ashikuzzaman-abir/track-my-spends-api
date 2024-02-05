import express from 'express';
import multer from '../middlewares/multer/multer.handler';
import uploadFile from '../controllers/upload/uploadFile';
const router = express.Router();

router.post('/', multer.single('image'), uploadFile);

export default router;
