import { IExperienceRepository } from '../../../domain/interfaces/IExperienceRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateExperienceUseCase {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async execute(profileId: string, expId: string, data: any): Promise<ProfileEntity> {
    return await this.experienceRepository.update(profileId, expId, data);
  }
}
