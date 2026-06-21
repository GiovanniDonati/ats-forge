import { ProfileEntity } from '../../../domain/entities/profile/Profile';
import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';

export class GetProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string): Promise<ProfileEntity | null> {
    return await this.profileRepository.findById(id);
  }
}
