import express from 'express';
import * as Family from '../Controller/familyController.js';
import { authRequired, permit } from '../Middleware/auth.js';

const router = express.Router();

router.get('/', authRequired, Family.getMembers);
router.post('/', authRequired, Family.createMember); 
router.put('/:id', authRequired, Family.updateMember);
router.delete('/:id', authRequired, Family.deleteMember);

export default router;
