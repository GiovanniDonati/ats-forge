import { SkillEntity } from "../entities/profile/Skill";
import { ProfileEntity } from "../entities/profile/Profile";

export interface ISkillRepository {
  add(profileId: string, skills: SkillEntity[]): Promise<ProfileEntity>;
  update(profileId: string, skillId: string, data: Partial<SkillEntity>): Promise<ProfileEntity>;
}
