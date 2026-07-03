import { ProfileLanguageEntity } from "../entities/profile/ProfileLanguage";
import { ProfileEntity } from "../entities/profile/Profile";

export interface ILanguageRepository {
  add(profileId: string, languages: ProfileLanguageEntity[]): Promise<ProfileEntity>;
  update(profileId: string, languageId: string, data: Partial<ProfileLanguageEntity>): Promise<ProfileEntity>;
}
