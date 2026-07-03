import { ILanguageRepository } from '../../../domain/interfaces/ILanguageRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class UpdateLanguageUseCase {
  constructor(private readonly languageRepository: ILanguageRepository) {}

  async execute(profileId: string, langId: string, data: any): Promise<ProfileEntity> {
    return await this.languageRepository.update(profileId, langId, data);
  }
}
