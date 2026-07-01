import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateEducationUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, eduId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateEducation(profileId, eduId, data);
  }
}
