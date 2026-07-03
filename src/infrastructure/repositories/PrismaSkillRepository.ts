import { PrismaClient } from '../../generated/prisma';
import { ISkillRepository } from '../../domain/interfaces/ISkillRepository';
import { SkillEntity } from '../../domain/entities/profile/Skill';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { prisma } from '../../../config/prisma';
import { ProfileMapper } from './ProfileMapper';

export class PrismaSkillRepository implements ISkillRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async add(profileId: string, skills: SkillEntity[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        skills: {
          connectOrCreate: skills.map((skill) => ({
            where: { name: skill.name },
            create: { name: skill.name },
          })),
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }

  async update(profileId: string, skillId: string, data: Partial<SkillEntity>): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        skills: {
          update: {
            where: { id: skillId },
            data: { name: data.name },
          },
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }
}
