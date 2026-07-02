import { Request, Response } from 'express';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { AddProfileEducationsUseCase } from '../../../application/use-cases/profile/AddProfileEducationsUseCase';
import { UpdateEducationUseCase } from '../../../application/use-cases/profile/UpdateEducationUseCase';
import { PrismaProfileRepository } from '../../../infrastructure/repositories/PrismaProfileRepository';

const profileRepository = new PrismaProfileRepository();
const getProfileUseCase = new GetProfileUseCase(profileRepository);
const addProfileEducationsUseCase = new AddProfileEducationsUseCase(profileRepository);
const updateEducationUseCase = new UpdateEducationUseCase(profileRepository);

export const EducationController = {
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
};
