import { Request, Response } from 'express';
import { GetProfileUseCase } from '../../../application/use-cases/profile/GetProfileUseCase';
import { AddProfileProjectsUseCase } from '../../../application/use-cases/profile/AddProfileProjectsUseCase';
import { UpdateProjectUseCase } from '../../../application/use-cases/profile/UpdateProjectUseCase';
import { PrismaProfileRepository } from '../../../infrastructure/repositories/PrismaProfileRepository';
import { PrismaProjectRepository } from '../../../infrastructure/repositories/PrismaProjectRepository';

const profileRepository = new PrismaProfileRepository();
const projectRepository = new PrismaProjectRepository();

const getProfileUseCase = new GetProfileUseCase(profileRepository);
const addProfileProjectsUseCase = new AddProfileProjectsUseCase(projectRepository);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);

export const ProjectController = {
...

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
};
