import { ISkillRepository } from '../../../domain/interfaces/ISkillRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileSkillsUseCase {
  constructor(private readonly skillRepository: ISkillRepository) {}

  async execute(id: string, skills: any[]): Promise<ProfileEntity> {
    return await this.skillRepository.add(id, skills);
  }
}
