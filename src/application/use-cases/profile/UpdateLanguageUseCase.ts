import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateLanguageUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(profileId: string, langId: string, data: any): Promise<ProfileEntity> {
    return await this.profileRepository.updateLanguage(profileId, langId, data);
  }
}
