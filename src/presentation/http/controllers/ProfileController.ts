import { Request, Response } from 'express';
import { CreateProfileUseCase } from '../../../application/use-cases/profile/CreateProfileUseCase';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { PrismaProfileRepository } from '../../../infrastructure/repositories/PrismaProfileRepository';
import { GetProfilesByUserIdUseCase } from '../../../application/use-cases/profile/GetProfilesByUserIdUseCase';

const profileRepository = new PrismaProfileRepository();
const createProfileUseCase = new CreateProfileUseCase(profileRepository);
const getProfileUseCase = new GetProfileUseCase(profileRepository);
const getProfilesByUserIdUseCase = new GetProfilesByUserIdUseCase(profileRepository);

export const ProfileController = {
  async create(req: Request, res: Response) {
    try {
      const profile = await createProfileUseCase.execute(req.body);
      res.status(201).json(profile);
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
