import { ISkillRepository } from '../../../domain/interfaces/ISkillRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateSkillUseCase {
  constructor(private readonly skillRepository: ISkillRepository) {}

  async execute(profileId: string, skillId: string, data: any): Promise<ProfileEntity> {
    return await this.skillRepository.update(profileId, skillId, data);
  }
}
