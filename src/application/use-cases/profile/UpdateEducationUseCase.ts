import { IEducationRepository } from '../../../domain/interfaces/IEducationRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateEducationUseCase {
  constructor(private readonly educationRepository: IEducationRepository) {}

  async execute(profileId: string, eduId: string, data: any): Promise<ProfileEntity> {
    return await this.educationRepository.update(profileId, eduId, data);
  }
}
