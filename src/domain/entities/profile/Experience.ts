export interface ExperienceEntity {
  id?: string;
  profileId?: string;
  title: string;
  company: string;
  location?: string | null;
  activities: string[];
  results: string[];
  stacks: string[];
  startDate: Date;
  endDate?: Date | null;
  isCurrent: boolean;
}
