import express from 'express';
import createARole from '../controllers/role/createARole.controller';
import { getAllRoles } from '../controllers/role/getAllRoles.controller';

const router = express.Router();

router.post('/', createARole);
router.get('/', getAllRoles);

export default router;
