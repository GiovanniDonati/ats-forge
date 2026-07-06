import { prisma } from '../../../config/prisma';
import { PrismaClient } from '../../generated/prisma';
import { UserEntity } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async create(user: UserEntity, passwordHash?: string): Promise<UserEntity> {
    const data: any = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };

    if (user.id) {
      data.id = user.id;
    }

    if (passwordHash) {
      data.credentials = {
        create: {
          email: user.email,
          passwordHash,
        },
      };
    }

    const created = await this.prisma.user.create({
      data,
    });

    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;
    return this.mapToEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return this.mapToEntity(user);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) return null;
    return this.mapToEntity(user);
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
      },
    });

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getPasswordHashByUserId(userId: string): Promise<string | null> {
    const credential = await this.prisma.credential.findFirst({
      where: { userId },
    });

    return credential ? credential.passwordHash : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.mapToEntity);
  }

  private mapToEntity(user: any): UserEntity {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
