import { ProfileLanguageEntity } from './ProfileLanguage';
import { SkillEntity } from './Skill';
import { ExperienceEntity } from './Experience';
import { EducationEntity } from './Education';
import { ProjectEntity } from './Project';

export interface ProfileEntity {
  id?: string;
  userId: string;
  resumeName: string;
  name: string;
  headline?: string | null;
  summary?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  languages?: ProfileLanguageEntity[];
  skills?: SkillEntity[];
  experiences?: ExperienceEntity[];
  educations?: EducationEntity[];
  projects?: ProjectEntity[];
}
