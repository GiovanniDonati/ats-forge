import { ProfileEntity } from "../entities/profile/Profile";

export interface IProfileRepository {
  create(profile: ProfileEntity): Promise<ProfileEntity>;
  findById(id: string): Promise<ProfileEntity | null>;
  findAll(): Promise<ProfileEntity[]>;
  findByUserId(userId: string): Promise<ProfileEntity[]>;
  update(id: string, profile: Partial<ProfileEntity>): Promise<ProfileEntity>;
  delete(id: string): Promise<void>;
}
