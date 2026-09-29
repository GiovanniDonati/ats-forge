export interface RenderContact {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  formacao: string[];
  idiomas: string[];
}

export interface RenderExperience {
  empresa: string;
  cargo: string;
  periodo: string;
  stack: string;
  atividades: string[];
  resultados: string[];
}

export interface RenderPayload {
  contact: RenderContact;
  focus: string;
  title: string;
  profile: string;
  skills: Record<string, string[]>;
  experiencias: RenderExperience[];
  extraKeywords: string[];
}

export interface IResumeRenderer {
  readonly extension: string;
  render(payload: RenderPayload): Promise<Buffer | string>;
}
