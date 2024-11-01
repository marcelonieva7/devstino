"use server"

import { type FormErrors } from "@/types"
import { devstinationRepository } from "@/lib/db"
import { newDestinationSchema, type NewDestinationType } from '@/schemas/destination';
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/enums";

export type FormState = {
  updatedData?: Partial<NewDestinationType>,
  serverErrors?: FormErrors
}

export const updateValue = async (
  id: string,
  slug: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const data = Object.fromEntries(formData.entries());

  const validated = newDestinationSchema.partial().safeParse(data);
  if (!validated.success) {
    const errors = validated.error.issues.reduce((acc: FormErrors, issue) => {
      const path = issue.path[0] as string;
      acc[path] = issue.message;
      return acc;
    }, {});
    return {serverErrors: errors};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { perpetrator_id, technology_id, photo_url, ...rest } = validated.data

  const newData = {
    ...rest,
    evilDev: perpetrator_id ?[perpetrator_id] : undefined,
    technology: technology_id? [technology_id] : undefined,
  }

  try {
    await devstinationRepository.update(id, {...newData, description: null})
    revalidatePath(`${ROUTES.EDIT}/${slug}`)
    revalidatePath(`${ROUTES.DEVSTINO}/${slug}`)

    return { updatedData: validated.data }
  } catch (error) {
    console.error(error)
    return {serverErrors: {db: "Error al actualizar el devstino"}}
  }

};