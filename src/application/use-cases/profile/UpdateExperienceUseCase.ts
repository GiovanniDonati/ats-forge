import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateExperienceUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, expId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateExperience(profileId, expId, data);
  }
}
