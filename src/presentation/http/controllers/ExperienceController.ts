import { Request, Response } from 'express';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { AddProfileExperiencesUseCase } from '../../../application/use-cases/profile/AddProfileExperiencesUseCase';
import { UpdateExperienceUseCase } from '../../../application/use-cases/profile/UpdateExperienceUseCase';
import { PrismaProfileRepository } from '../../../infrastructure/repositories/PrismaProfileRepository';
import { PrismaExperienceRepository } from '../../../infrastructure/repositories/PrismaExperienceRepository';

const profileRepository = new PrismaProfileRepository();
const experienceRepository = new PrismaExperienceRepository();

const getProfileUseCase = new GetProfileUseCase(profileRepository);
const addProfileExperiencesUseCase = new AddProfileExperiencesUseCase(experienceRepository);
const updateExperienceUseCase = new UpdateExperienceUseCase(experienceRepository);

export const ExperienceController = {
...

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
};
