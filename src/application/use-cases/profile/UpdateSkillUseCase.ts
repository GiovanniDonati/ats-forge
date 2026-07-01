import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateSpecificSkillUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, skillId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateSpecificSkill(profileId, skillId, data);
  }
}
