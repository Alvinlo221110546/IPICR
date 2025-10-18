import express from 'express';
import * as Family from '../Controller/familyController.js';
import { authRequired, permit } from '../Middleware/auth.js';
const router = express.Router();

router.get('/', authRequired, Family.getMembers);
router.post('/', authRequired, permit('admin'), Family.createMember);
router.put('/:id', authRequired, permit('admin'), Family.updateMember);
router.delete('/:id', authRequired, permit('admin'), Family.deleteMember);

export default router;
