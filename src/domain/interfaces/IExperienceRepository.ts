import { ExperienceEntity } from "../entities/profile/Experience";
import { ProfileEntity } from "../entities/profile/Profile";

export interface IExperienceRepository {
  add(profileId: string, experiences: ExperienceEntity[]): Promise<ProfileEntity>;
  update(profileId: string, experienceId: string, data: Partial<ExperienceEntity>): Promise<ProfileEntity>;
}
