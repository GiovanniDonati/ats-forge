import { ProfileEntity } from '../../domain/entities/profile/Profile';
import { LanguageLevel, EducationType } from '../../domain/entities/profile/ProfileTypes';

export class ProfileMapper {
  static toEntity(profile: any): ProfileEntity {
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
