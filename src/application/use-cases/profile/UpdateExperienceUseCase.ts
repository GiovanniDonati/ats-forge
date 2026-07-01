import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateSpecificExperienceUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, expId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateSpecificExperience(profileId, expId, data);
  }
}
