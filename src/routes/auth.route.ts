import express from 'express';
import login from '../controllers/auth/login.controller';

const router = express.Router();

router.post('/login', login);

export default router;
