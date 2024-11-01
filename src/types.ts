import { type Models } from "appwrite";

export interface FormErrors {
  [key: string]: string | undefined;
}

export type EvilDevs = {
  bio: string,
  name: string,
}

export type EvilDevsDTO = EvilDevs & Models.Document

export type Devstination = {
  isDeleted?: boolean,
  user_id: string,
  name: string,
  age: number,
  slug: string,
  photo_id: string,
  description?: string | null,
  evilDev: EvilDevs[] | string[],
  technology: Technology[] | string[],
}

export type DevstinationDTO = Omit<Devstination, ("evilDev" | "technology")> & Models.Document & {evilDev: EvilDevsDTO[], technology: TechnologyDTO[]}

export type Technology = {
  name: string,
  description: string,
}

export type TechnologyDTO = Technology & Models.Document