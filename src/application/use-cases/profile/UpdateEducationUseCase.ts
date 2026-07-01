import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateSpecificEducationUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, eduId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateSpecificEducation(profileId, eduId, data);
  }
}
