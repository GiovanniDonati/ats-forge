import { IProfileRepository } from '../../../domain/interfaces/IProfileRepository';
import { ProfileEntity } from '../../../domain/entities/profile/Profile';

export class AddProfileLanguagesUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string, languages: any[]): Promise<ProfileEntity> {
    return await this.profileRepository.addLanguages(id, languages);
  }
}
