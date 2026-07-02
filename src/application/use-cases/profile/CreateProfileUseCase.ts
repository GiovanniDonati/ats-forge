import { ProfileEntity } from '../../../domain/entities/profile/Profile';
import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';

export class CreateProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profile: ProfileEntity): Promise<ProfileEntity> {
    console.log('Profile object:', JSON.stringify(profile, null, 2));
    return await this.profileRepository.create(profile);
  }
}
