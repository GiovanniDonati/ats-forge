import { ProfileEntity } from '../../../domain/entities/profile/Profile';
import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';

export class CreateProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profile: ProfileEntity): Promise<ProfileEntity> {
    // Aqui poderiam entrar regras de negócio, validações, etc.
    return await this.profileRepository.create(profile);
  }
}
