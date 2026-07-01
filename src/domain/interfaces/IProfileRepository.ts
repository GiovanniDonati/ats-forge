import { ProfileEntity } from "../entities/profile/Profile";

export interface IProfileRepository {
  create(profile: ProfileEntity): Promise<ProfileEntity>;
  findById(id: string): Promise<ProfileEntity | null>;
  findAll(): Promise<ProfileEntity[]>;
  findByUserId(userId: string): Promise<ProfileEntity[]>;
  update(id: string, profile: Partial<ProfileEntity>): Promise<ProfileEntity>;
  addSkills(id: string, skills: any[]): Promise<ProfileEntity>;
  addExperiences(id: string, experiences: any[]): Promise<ProfileEntity>;
  addProjects(id: string, projects: any[]): Promise<ProfileEntity>;
  addEducations(id: string, educations: any[]): Promise<ProfileEntity>;
  addLanguages(id: string, languages: any[]): Promise<ProfileEntity>;
  updateSkill(profileId: string, skillId: string, data: any): Promise<ProfileEntity>;
  updateExperience(profileId: string, expId: string, data: any): Promise<ProfileEntity>;
  updateProject(profileId: string, projId: string, data: any): Promise<ProfileEntity>;
  updateEducation(profileId: string, eduId: string, data: any): Promise<ProfileEntity>;
  updateLanguage(profileId: string, langId: string, data: any): Promise<ProfileEntity>;

  delete(id: string): Promise<void>;
}
