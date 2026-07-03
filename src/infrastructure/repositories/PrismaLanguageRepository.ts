import { PrismaClient } from '../../generated/prisma';
import { ILanguageRepository } from '../../domain/interfaces/ILanguageRepository';
import { ProfileLanguageEntity } from '../../domain/entities/profile/ProfileLanguage';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { prisma } from '../../../config/prisma';
import { ProfileMapper } from './ProfileMapper';

export class PrismaLanguageRepository implements ILanguageRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async add(profileId: string, languages: ProfileLanguageEntity[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        languages: {
          create: languages.map((lang) => ({
            name: lang.name,
            level: lang.level,
          })),
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }

  async update(profileId: string, languageId: string, data: Partial<ProfileLanguageEntity>): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        languages: {
          update: {
            where: { id: languageId },
            data: {
              name: data.name,
              level: data.level,
            },
          },
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return ProfileMapper.toEntity(updated);
  }
}
