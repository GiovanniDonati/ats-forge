import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileProjectsUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string, projects: any[]): Promise<ProfileEntity> {
    return await this.profileRepository.addProjects(id, projects);
  }
}
