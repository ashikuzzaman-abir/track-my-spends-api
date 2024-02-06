import express from 'express';
import createAUser from '../controllers/user/createAuser.controller';
import getAllUsers from '../controllers/user/getAllUsers.controller';

const router = express.Router();

router.post('/', createAUser);
router.get('/', getAllUsers);

export default router;
