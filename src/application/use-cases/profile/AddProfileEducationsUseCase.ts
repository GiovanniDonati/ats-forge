import { IEducationRepository } from '../../../domain/interfaces/IEducationRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileEducationsUseCase {
  constructor(private readonly educationRepository: IEducationRepository) {}

  async execute(id: string, educations: any[]): Promise<ProfileEntity> {
    return await this.educationRepository.add(id, educations);
  }
}
