import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileSkillsUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string, skills: any[]): Promise<ProfileEntity> {
    return await this.profileRepository.addSkills(id, skills);
  }
}
