import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateSpecificProjectUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, projId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateSpecificProject(profileId, projId, data);
  }
}
