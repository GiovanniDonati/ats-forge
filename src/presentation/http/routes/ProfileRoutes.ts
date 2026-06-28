import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/', ProfileController.create);
router.get('/user/:userId', ProfileController.getByUserId);
router.get('/:id', authenticateToken, ProfileController.getById);

export default router;