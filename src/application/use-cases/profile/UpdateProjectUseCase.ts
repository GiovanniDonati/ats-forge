import { IProjectRepository } from '../../../domain/interfaces/IProjectRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(profileId: string, projId: string, data: any): Promise<ProfileEntity> {
    return await this.projectRepository.update(profileId, projId, data);
  }
}
