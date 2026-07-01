import { PrismaClient } from '../../generated/prisma';
import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { LanguageLevel, EducationType } from '../../domain/entities/profile/ProfileTypes';
import { IProfileRepository } from '../../domain/interfaces/IProfileRepository';
import { prisma } from '../../../config/prisma';

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

    return this.mapToEntity(created);
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
    return profiles.map((p) => this.mapToEntity(p));
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
    return this.mapToEntity(profile);
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

    return profiles.map((p) => this.mapToEntity(p));
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

    return this.mapToEntity(updated);
  }

  async addSkills(id: string, skills: any[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id },
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

    return this.mapToEntity(updated);
  }

  async addExperiences(id: string, experiences: any[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id },
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
    return this.mapToEntity(updated);
  }

  async addProjects(id: string, projects: any[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id },
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
    return this.mapToEntity(updated);
  }

  async addEducations(id: string, educations: any[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id },
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
    return this.mapToEntity(updated);
  }

  async addLanguages(id: string, languages: any[]): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id },
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
    return this.mapToEntity(updated);
  }

  async updateSkill(profileId: string, skillId: string, data: any): Promise<ProfileEntity> {
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
    return this.mapToEntity(updated);
  }

  async updateExperience(profileId: string, expId: string, data: any): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        experiences: {
          update: {
            where: { id: expId },
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
    return this.mapToEntity(updated);
  }

  async updateProject(profileId: string, projId: string, data: any): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        projects: {
          update: {
            where: { id: projId },
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
    return this.mapToEntity(updated);
  }

  async updateEducation(profileId: string, eduId: string, data: any): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        educations: {
          update: {
            where: { id: eduId },
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
    return this.mapToEntity(updated);
  }

  async updateLanguage(profileId: string, langId: string, data: any): Promise<ProfileEntity> {
    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        languages: {
          update: {
            where: { id: langId },
            data: {
              name: data.name,
              level: data.level,
            },
          },
        },
      },
      include: { languages: true, skills: true, experiences: true, educations: true, projects: { include: { skills: true } } },
    });
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.profile.delete({
      where: { id },
    });
  }

  private mapToEntity(profile: any): ProfileEntity {
    return {
      id: profile.id,
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
      languages: profile.languages?.map((lang: any) => ({
        id: lang.id,
        profileId: lang.profileId,
        name: lang.name,
        level: lang.level as LanguageLevel,
      })),
      skills: profile.skills?.map((skill: any) => ({
        id: skill.id,
        name: skill.name,
      })),
      experiences: profile.experiences?.map((exp: any) => ({
        id: exp.id,
        profileId: exp.profileId,
        title: exp.title,
        company: exp.company,
        location: exp.location,
        activities: exp.activities,
        results: exp.results,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
      })),
      educations: profile.educations?.map((edu: any) => ({
        id: edu.id,
        profileId: edu.profileId,
        school: edu.school,
        fieldOfStudy: edu.fieldOfStudy,
        degreeType: edu.degreeType as EducationType,
        startDate: edu.startDate,
        endDate: edu.endDate,
        isCurrent: edu.isCurrent,
      })),
      projects: profile.projects?.map((proj: any) => ({
        id: proj.id,
        profileId: proj.profileId,
        name: proj.name,
        description: proj.description,
        repository: proj.repository,
        deploy: proj.deploy,
        startDate: proj.startDate,
        endDate: proj.endDate,
        skills: proj.skills?.map((skill: any) => ({
          id: skill.id,
          name: skill.name,
        })),
      })),
    };
  }
}
