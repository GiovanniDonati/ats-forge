import { IProjectRepository } from '../../../domain/interfaces/IProjectRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(id: string, projects: any[]): Promise<ProfileEntity> {
    return await this.projectRepository.add(id, projects);
  }
}
