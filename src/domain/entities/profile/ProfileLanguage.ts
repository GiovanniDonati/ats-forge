import { LanguageLevel } from './ProfileTypes';

export interface ProfileLanguageEntity {
  id?: string;
  profileId?: string;
  name: string;
  level: LanguageLevel;
}
