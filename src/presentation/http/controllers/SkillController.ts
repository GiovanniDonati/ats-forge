import { Request, Response } from 'express';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { AddProfileSkillsUseCase } from '../../../application/use-cases/profile/AddProfileSkillsUseCase';
import { UpdateSkillUseCase } from '../../../application/use-cases/profile/UpdateSkillUseCase';
import { PrismaProfileRepository } from '../../../infrastructure/repositories/PrismaProfileRepository';

const profileRepository = new PrismaProfileRepository();
const getProfileUseCase = new GetProfileUseCase(profileRepository);
const addProfileSkillsUseCase = new AddProfileSkillsUseCase(profileRepository);
const updateSkillUseCase = new UpdateSkillUseCase(profileRepository);

export const SkillController = {
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
};
