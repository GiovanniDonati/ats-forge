import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/', ProfileController.create);

router.post('/:id/skills', authenticateToken, ProfileController.addSkill);
router.get('/:id/skills', authenticateToken, ProfileController.getSkills);
router.patch('/:id/skills/:skillId', authenticateToken, ProfileController.updateSkill);

router.post('/:id/experiences', authenticateToken, ProfileController.addExperience);
router.get('/:id/experiences', authenticateToken, ProfileController.getExperiences);
router.patch('/:id/experiences/:expId', authenticateToken, ProfileController.updateExperience);

router.post('/:id/projects', authenticateToken, ProfileController.addProject);
router.get('/:id/projects', authenticateToken, ProfileController.getProjects);
router.patch('/:id/projects/:projId', authenticateToken, ProfileController.updateProject);

router.post('/:id/educations', authenticateToken, ProfileController.addEducation);
router.get('/:id/educations', authenticateToken, ProfileController.getEducations);
router.patch('/:id/educations/:eduId', authenticateToken, ProfileController.updateEducation);

router.post('/:id/languages', authenticateToken, ProfileController.addLanguage);
router.get('/:id/languages', authenticateToken, ProfileController.getLanguages);
router.patch('/:id/languages/:langId', authenticateToken, ProfileController.updateLanguage);

router.get('/user/:userId', ProfileController.getByUserId);
router.get('/:id', authenticateToken, ProfileController.getById);

export default router;