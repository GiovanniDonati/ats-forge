import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { SkillController } from '../controllers/SkillController';
import { ExperienceController } from '../controllers/ExperienceController';
import { ProjectController } from '../controllers/ProjectController';
import { EducationController } from '../controllers/EducationController';
import { LanguageController } from '../controllers/LanguageController';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

router.post('/', ProfileController.create);

// Skills
router.post('/:id/skills', authenticateToken, SkillController.addSkill);
router.get('/:id/skills', authenticateToken, SkillController.getSkills);
router.patch('/:id/skills/:skillId', authenticateToken, SkillController.updateSkill);

// Experiences
router.post('/:id/experiences', authenticateToken, ExperienceController.addExperience);
router.get('/:id/experiences', authenticateToken, ExperienceController.getExperiences);
router.patch('/:id/experiences/:expId', authenticateToken, ExperienceController.updateExperience);

// Projects
router.post('/:id/projects', authenticateToken, ProjectController.addProject);
router.get('/:id/projects', authenticateToken, ProjectController.getProjects);
router.patch('/:id/projects/:projId', authenticateToken, ProjectController.updateProject);

// Educations
router.post('/:id/educations', authenticateToken, EducationController.addEducation);
router.get('/:id/educations', authenticateToken, EducationController.getEducations);
router.patch('/:id/educations/:eduId', authenticateToken, EducationController.updateEducation);

// Languages
router.post('/:id/languages', authenticateToken, LanguageController.addLanguage);
router.get('/:id/languages', authenticateToken, LanguageController.getLanguages);
router.patch('/:id/languages/:langId', authenticateToken, LanguageController.updateLanguage);

router.get('/user/:userId', ProfileController.getByUserId);
router.get('/:id', authenticateToken, ProfileController.getById);

export default router;
