import { Request, Response } from 'express';
import { CreateProfileUseCase } from '../../../application/use-cases/profile/CreateProfileUseCase';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { AddProfileSkillsUseCase } from '../../../application/use-cases/profile/AddProfileSkillsUseCase';
import { AddProfileExperiencesUseCase } from '../../../application/use-cases/profile/AddProfileExperiencesUseCase';
import { AddProfileProjectsUseCase } from '../../../application/use-cases/profile/AddProfileProjectsUseCase';
import { AddProfileEducationsUseCase } from '../../../application/use-cases/profile/AddProfileEducationsUseCase';
import { AddProfileLanguagesUseCase } from '../../../application/use-cases/profile/AddProfileLanguagesUseCase';

import { UpdateSkillUseCase } from '../../../application/use-cases/profile/UpdateSkillUseCase';
import { UpdateExperienceUseCase } from '../../../application/use-cases/profile/UpdateExperienceUseCase';
import { UpdateProjectUseCase } from '../../../application/use-cases/profile/UpdateProjectUseCase';
import { UpdateEducationUseCase } from '../../../application/use-cases/profile/UpdateEducationUseCase';
import { UpdateLanguageUseCase } from '../../../application/use-cases/profile/UpdateLanguageUseCase';
import { PrismaProfileRepository } from '../../../infrastructure/repositories/PrismaProfileRepository';
import { GetProfilesByUserIdUseCase } from '../../../application/use-cases/profile/GetProfilesByUserIdUseCase';

const profileRepository = new PrismaProfileRepository();
const createProfileUseCase = new CreateProfileUseCase(profileRepository);
const getProfileUseCase = new GetProfileUseCase(profileRepository);
const getProfilesByUserIdUseCase = new GetProfilesByUserIdUseCase(profileRepository);
const addProfileSkillsUseCase = new AddProfileSkillsUseCase(profileRepository);
const addProfileExperiencesUseCase = new AddProfileExperiencesUseCase(profileRepository);
const addProfileProjectsUseCase = new AddProfileProjectsUseCase(profileRepository);
const addProfileEducationsUseCase = new AddProfileEducationsUseCase(profileRepository);
const addProfileLanguagesUseCase = new AddProfileLanguagesUseCase(profileRepository);
const updateSkillUseCase = new UpdateSkillUseCase(profileRepository);
const updateExperienceUseCase = new UpdateExperienceUseCase(profileRepository);
const updateProjectUseCase = new UpdateProjectUseCase(profileRepository);
const updateEducationUseCase = new UpdateEducationUseCase(profileRepository);
const updateLanguageUseCase = new UpdateLanguageUseCase(profileRepository);

export const ProfileController = {
  async create(req: Request, res: Response) {
    try {
      const profile = await createProfileUseCase.execute(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  
  async addSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await addProfileSkillsUseCase.execute(id as string, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getSkills(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await getProfileUseCase.execute(id as string);
      res.status(200).json(profile?.skills || []);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async updateSkill(req: Request, res: Response) {
    try {
      const { id, skillId } = req.params;
      const profile = await updateSkillUseCase.execute(id as string, skillId as string, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  
  async addExperience(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await addProfileExperiencesUseCase.execute(id as string, [req.body]);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getExperiences(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await getProfileUseCase.execute(id as string);
      res.status(200).json(profile?.experiences || []);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async updateExperience(req: Request, res: Response) {
    try {
      const { id, expId } = req.params;
      const profile = await updateExperienceUseCase.execute(id as string, expId as string, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  
  async addProject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await addProfileProjectsUseCase.execute(id as string, [req.body]);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getProjects(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await getProfileUseCase.execute(id as string);
      res.status(200).json(profile?.projects || []);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async updateProject(req: Request, res: Response) {
    try {
      const { id, projId } = req.params;
      const profile = await updateProjectUseCase.execute(id as string, projId as string, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  
  async addEducation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await addProfileEducationsUseCase.execute(id as string, [req.body]);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getEducations(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await getProfileUseCase.execute(id as string);
      res.status(200).json(profile?.educations || []);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async updateEducation(req: Request, res: Response) {
    try {
      const { id, eduId } = req.params;
      const profile = await updateEducationUseCase.execute(id as string, eduId as string, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  
  async addLanguage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await addProfileLanguagesUseCase.execute(id as string, [req.body]);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getLanguages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await getProfileUseCase.execute(id as string);
      res.status(200).json(profile?.languages || []);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async updateLanguage(req: Request, res: Response) {
    try {
      const { id, langId } = req.params;
      const profile = await updateLanguageUseCase.execute(id as string, langId as string, req.body);
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getByUserId(req: Request, res: Response) {
    try {
      const profiles = await getProfilesByUserIdUseCase.execute(req.params.userId as string);
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const profile = await getProfileUseCase.execute(req.params.id as string);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};
