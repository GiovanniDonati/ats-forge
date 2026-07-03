import { EducationEntity } from "../entities/profile/Education";
import { ProfileEntity } from "../entities/profile/Profile";

export interface IEducationRepository {
  add(profileId: string, educations: EducationEntity[]): Promise<ProfileEntity>;
  update(profileId: string, educationId: string, data: Partial<EducationEntity>): Promise<ProfileEntity>;
}
