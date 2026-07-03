import { IExperienceRepository } from '../../../domain/interfaces/IExperienceRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileExperiencesUseCase {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async execute(id: string, experiences: any[]): Promise<ProfileEntity> {
    return await this.experienceRepository.add(id, experiences);
  }
}
