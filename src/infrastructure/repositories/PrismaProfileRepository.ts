import { PrismaClient } from '../../generated/prisma';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { IProfileRepository } from '../../domain/interfaces/IProfileRepository';
import { prisma } from '../../../config/prisma';
import { ProfileMapper } from './ProfileMapper';

export class PrismaProfileRepository implements IProfileRepository {
  private prisma: PrismaClient;

  constructor(prismaInstance?: PrismaClient) {
    this.prisma = prismaInstance || prisma;
  }

  async create(profile: ProfileEntity): Promise<ProfileEntity> {
    const data: any = {
      userId: profile.userId,
      resumeName: profile.resumeName,
      name: profile.name,
      headline: profile.headline,
      summary: profile.summary,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      linkedin: profile.linkedin,
      github: profile.github,
      portfolio: profile.portfolio,
    };

    if (profile.id) {
      data.id = profile.id;
    }

    if (profile.skills && profile.skills.length > 0) {
      data.skills = {
        connectOrCreate: profile.skills.map((skill) => ({
          where: { name: skill.name },
          create: { name: skill.name },
        })),
      };
    }

    if (profile.languages && profile.languages.length > 0) {
      data.languages = {
        create: profile.languages.map((lang) => ({
          name: lang.name,
          level: lang.level as any,
        })),
      };
    }

    if (profile.experiences && profile.experiences.length > 0) {
      data.experiences = {
        create: profile.experiences.map((exp) => ({
          title: exp.title,
          company: exp.company,
          location: exp.location,
          activities: exp.activities,
          results: exp.results,
          startDate: exp.startDate,
          endDate: exp.endDate,
          isCurrent: exp.isCurrent,
        })),
      };
    }

    if (profile.educations && profile.educations.length > 0) {
      data.educations = {
        create: profile.educations.map((edu) => ({
          school: edu.school,
          fieldOfStudy: edu.fieldOfStudy,
          degreeType: edu.degreeType as any,
          startDate: edu.startDate,
          endDate: edu.endDate,
          isCurrent: edu.isCurrent,
        })),
      };
    }

    if (profile.projects && profile.projects.length > 0) {
      data.projects = {
        create: profile.projects.map((proj) => ({
          name: proj.name,
          description: proj.description,
          repository: proj.repository,
          deploy: proj.deploy,
          startDate: proj.startDate,
          endDate: proj.endDate,
          skills: proj.skills && proj.skills.length > 0
            ? {
                connectOrCreate: proj.skills.map((skill) => ({
                  where: { name: skill.name },
                  create: { name: skill.name },
                })),
              }
            : undefined,
        })),
      };
    }

    const created = await this.prisma.profile.create({
      data,
      include: {
        languages: true,
        skills: true,
        experiences: true,
        educations: true,
        projects: {
          include: {
            skills: true,
          },
        },
      },
    });

    return ProfileMapper.toEntity(created);
  }

  async findAll(): Promise<ProfileEntity[]> {
    const profiles = await this.prisma.profile.findMany({
      include: {
        languages: true,
        skills: true,
        experiences: true,
        educations: true,
        projects: {
          include: {
            skills: true,
          },
        },
      },
    });
    return profiles.map((p) => ProfileMapper.toEntity(p));
  }

  async findById(id: string): Promise<ProfileEntity | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        languages: true,
        skills: true,
        experiences: true,
        educations: true,
        projects: {
          include: {
            skills: true,
          },
        },
      },
    });

    if (!profile) return null;
    return ProfileMapper.toEntity(profile);
  }

  async findByUserId(userId: string): Promise<ProfileEntity[]> {
    const profiles = await this.prisma.profile.findMany({
      where: { userId },
      include: {
        languages: true,
        skills: true,
        experiences: true,
        educations: true,
        projects: {
          include: {
            skills: true,
          },
        },
      },
    });

    return profiles.map((p) => ProfileMapper.toEntity(p));
  }

  async update(id: string, profile: Partial<ProfileEntity>): Promise<ProfileEntity> {
    const updated = await this.prisma.$transaction(async (tx) => {
      if (profile.languages) {
        await tx.profileLanguage.deleteMany({ where: { profileId: id } });
      }
      if (profile.experiences) {
        await tx.experience.deleteMany({ where: { profileId: id } });
      }
      if (profile.educations) {
        await tx.education.deleteMany({ where: { profileId: id } });
      }
      if (profile.projects) {
        await tx.project.deleteMany({ where: { profileId: id } });
      }

      const data: any = {};
      if (profile.resumeName !== undefined) data.resumeName = profile.resumeName;
      if (profile.name !== undefined) data.name = profile.name;
      if (profile.headline !== undefined) data.headline = profile.headline;
      if (profile.summary !== undefined) data.summary = profile.summary;
      if (profile.email !== undefined) data.email = profile.email;
      if (profile.phone !== undefined) data.phone = profile.phone;
      if (profile.location !== undefined) data.location = profile.location;
      if (profile.linkedin !== undefined) data.linkedin = profile.linkedin;
      if (profile.github !== undefined) data.github = profile.github;
      if (profile.portfolio !== undefined) data.portfolio = profile.portfolio;

      if (profile.skills) {
        data.skills = {
          set: [],
          connectOrCreate: profile.skills.map((skill) => ({
            where: { name: skill.name },
            create: { name: skill.name },
          })),
        };
      }

      if (profile.languages && profile.languages.length > 0) {
        data.languages = {
          create: profile.languages.map((lang) => ({
            name: lang.name,
            level: lang.level as any,
          })),
        };
      }

      if (profile.experiences && profile.experiences.length > 0) {
        data.experiences = {
          create: profile.experiences.map((exp) => ({
            title: exp.title,
            company: exp.company,
            location: exp.location,
            activities: exp.activities,
            results: exp.results,
            startDate: exp.startDate,
            endDate: exp.endDate,
            isCurrent: exp.isCurrent,
          })),
        };
      }

      if (profile.educations && profile.educations.length > 0) {
        data.educations = {
          create: profile.educations.map((edu) => ({
            school: edu.school,
            fieldOfStudy: edu.fieldOfStudy,
            degreeType: edu.degreeType as any,
            startDate: edu.startDate,
            endDate: edu.endDate,
            isCurrent: edu.isCurrent,
          })),
        };
      }

      if (profile.projects && profile.projects.length > 0) {
        data.projects = {
          create: profile.projects.map((proj) => ({
            name: proj.name,
            description: proj.description,
            repository: proj.repository,
            deploy: proj.deploy,
            startDate: proj.startDate,
            endDate: proj.endDate,
            skills: proj.skills && proj.skills.length > 0
              ? {
                connectOrCreate: proj.skills.map((skill) => ({
                  where: { name: skill.name },
                  create: { name: skill.name },
                })),
              }
            : undefined,
          })),
        };
      }

      return tx.profile.update({
        where: { id },
        data,
        include: {
          languages: true,
          skills: true,
          experiences: true,
          educations: true,
          projects: {
            include: {
              skills: true,
            },
          },
        },
      });
    });

    return ProfileMapper.toEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.profile.delete({
      where: { id },
    });
  }
}
