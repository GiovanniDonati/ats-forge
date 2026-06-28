import { SkillEntity } from './Skill';

export interface ProjectEntity {
  id?: string;
  profileId?: string;
  name: string;
  description?: string | null;
  repository?: string | null;
  deploy?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  skills?: SkillEntity[];
}
