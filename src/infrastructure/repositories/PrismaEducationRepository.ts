import { PrismaClient } from '../../generated/prisma';
import { IEducationRepository } from '../../domain/interfaces/IEducationRepository';
import { EducationEntity } from '../../domain/entities/profile/Education';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { prisma } from '../../../config/prisma';
import { ProfileMapper } from './ProfileMapper';

export class PrismaEducationRepository implements IEducationRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async add(profileId: string, educations: EducationEntity[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        educations: {
          create: educations.map((edu) => ({
            school: edu.school,
            fieldOfStudy: edu.fieldOfStudy,
            degreeType: edu.degreeType,
            startDate: new Date(edu.startDate),
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            isCurrent: edu.isCurrent,
          })),
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }

  async update(profileId: string, educationId: string, data: Partial<EducationEntity>): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        educations: {
          update: {
            where: { id: educationId },
            data: {
              school: data.school,
              fieldOfStudy: data.fieldOfStudy,
              degreeType: data.degreeType,
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
