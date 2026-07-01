import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileEducationsUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string, educations: any[]): Promise<ProfileEntity> {
    return await this.profileRepository.addEducations(id, educations);
  }
}
