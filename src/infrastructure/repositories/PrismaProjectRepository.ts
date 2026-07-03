import { PrismaClient } from '../../generated/prisma';
import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { ProjectEntity } from '../../domain/entities/profile/Project';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { prisma } from '../../../config/prisma';
import { ProfileMapper } from './ProfileMapper';

export class PrismaProjectRepository implements IProjectRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async add(profileId: string, projects: ProjectEntity[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        projects: {
          create: projects.map((proj) => ({
            name: proj.name,
            description: proj.description,
            repository: proj.repository,
            deploy: proj.deploy,
            startDate: new Date(proj.startDate),
            endDate: proj.endDate ? new Date(proj.endDate) : null,
            skills: proj.skills ? { connectOrCreate: proj.skills.map((s:any) => ({ where: { name: s.name }, create: { name: s.name } })) } : undefined,
          })),
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }

  async update(profileId: string, projectId: string, data: Partial<ProjectEntity>): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        projects: {
          update: {
            where: { id: projectId },
            data: {
              name: data.name,
              description: data.description,
              repository: data.repository,
              deploy: data.deploy,
              startDate: data.startDate ? new Date(data.startDate) : undefined,
              endDate: data.endDate !== undefined ? (data.endDate ? new Date(data.endDate) : null) : undefined,
              skills: data.skills ? { set: [], connectOrCreate: data.skills.map((s:any) => ({ where: { name: s.name }, create: { name: s.name } })) } : undefined,
            },
          },
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }
}
