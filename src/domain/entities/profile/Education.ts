import { EducationType } from './ProfileTypes';

export interface EducationEntity {
  id?: string;
  profileId?: string;
  school: string;
  fieldOfStudy: string;
  degreeType: EducationType;
  startDate: Date;
  endDate?: Date | null;
  isCurrent: boolean;
}
