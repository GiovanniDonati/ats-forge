import { Request, Response } from 'express';
import { GetProfileUseCase } from '../../application/use-cases/profile/GetProfileUseCase';
import { AddProfileLanguagesUseCase } from '../../application/use-cases/profile/AddProfileLanguagesUseCase';
import { UpdateLanguageUseCase } from '../../application/use-cases/profile/UpdateLanguageUseCase';
import { PrismaProfileRepository } from '../../infrastructure/repositories/PrismaProfileRepository';
import { PrismaLanguageRepository } from '../../infrastructure/repositories/PrismaLanguageRepository';

const profileRepository = new PrismaProfileRepository();
const languageRepository = new PrismaLanguageRepository();

const getProfileUseCase = new GetProfileUseCase(profileRepository);
const addProfileLanguagesUseCase = new AddProfileLanguagesUseCase(languageRepository);
const updateLanguageUseCase = new UpdateLanguageUseCase(languageRepository);

export const LanguageController = {

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
};
