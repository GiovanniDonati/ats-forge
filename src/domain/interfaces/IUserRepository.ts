import { UserEntity } from '../entities/User';

export interface IUserRepository {
  create(user: UserEntity, passwordHash?: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  getPasswordHashByUserId(userId: string): Promise<string | null>;
  findAll(): Promise<UserEntity[]>;
}
