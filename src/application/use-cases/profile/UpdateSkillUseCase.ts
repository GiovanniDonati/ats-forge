import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateSkillUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, skillId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateSkill(profileId, skillId, data);
  }
}
