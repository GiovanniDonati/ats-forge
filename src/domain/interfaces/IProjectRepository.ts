import { ProjectEntity } from "../entities/profile/Project";
import { ProfileEntity } from "../entities/profile/Profile";

export interface IProjectRepository {
  add(profileId: string, projects: ProjectEntity[]): Promise<ProfileEntity>;
  update(profileId: string, projectId: string, data: Partial<ProjectEntity>): Promise<ProfileEntity>;
}
