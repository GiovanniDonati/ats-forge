import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateUserRegistration } from '../middlewares/validateUserRegistration';

const router = Router();

router.post('/register', validateUserRegistration, UserController.register);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);

export default router;
