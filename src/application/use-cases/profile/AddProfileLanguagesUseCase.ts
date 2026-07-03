import { ILanguageRepository } from '../../../domain/interfaces/ILanguageRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileLanguagesUseCase {
  constructor(private readonly languageRepository: ILanguageRepository) {}

  async execute(id: string, languages: any[]): Promise<ProfileEntity> {
    return await this.languageRepository.add(id, languages);
  }
}
