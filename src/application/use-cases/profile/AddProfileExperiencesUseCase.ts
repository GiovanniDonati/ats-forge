import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileExperiencesUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string, experiences: any[]): Promise<ProfileEntity> {
    return await this.profileRepository.addExperiences(id, experiences);
  }
}
