import { PrismaClient } from '../../generated/prisma';
import { IExperienceRepository } from '../../domain/interfaces/IExperienceRepository';
import { ExperienceEntity } from '../../domain/entities/profile/Experience';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { prisma } from '../../../config/prisma';
import { ProfileMapper } from './ProfileMapper';

export class PrismaExperienceRepository implements IExperienceRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async add(profileId: string, experiences: ExperienceEntity[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        experiences: {
          create: experiences.map((exp) => ({
            title: exp.title,
            company: exp.company,
            location: exp.location,
            activities: exp.activities,
            results: exp.results,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            isCurrent: exp.isCurrent,
          })),
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }

  async update(profileId: string, experienceId: string, data: Partial<ExperienceEntity>): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        experiences: {
          update: {
            where: { id: experienceId },
            data: {
              title: data.title,
              company: data.company,
              location: data.location,
              activities: data.activities,
              results: data.results,
              startDate: data.startDate ? new Date(data.startDate) : undefined,
              endDate: data.endDate !== undefined ? (data.endDate ? new Date(data.endDate) : null) : undefined,
              isCurrent: data.isCurrent,
            },
          },
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }
}
