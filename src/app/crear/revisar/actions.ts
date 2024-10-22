"use server"
import {
  NewDestinationType,
  stepTwoSchema,
  stepOneSchema,
  stepThreeSchema,
} from '@/schemas/destination';
import { ROUTES } from '@/enums';
import { devstinationRepository } from '@/lib/db';
import { nanoid } from "nanoid"
import { slugify } from '@/lib/utils';

type AddRoutes = typeof ROUTES["ADD"][keyof typeof ROUTES["ADD"]];
interface SubmitDestinationActionReturnType {
  redirect?: AddRoutes | typeof ROUTES["DEVSTINO"];
  errorMsg?: string;
  success?: boolean;
  slug?: string;
}

export const submitDestinationAction = async (
  destination: NewDestinationType,
  userId: string
): Promise<SubmitDestinationActionReturnType> => {
  const stepOneValidated = stepOneSchema.safeParse(destination);
  if (!stepOneValidated.success) {
    return {
      redirect: ROUTES.ADD.STEP_ONE,
      errorMsg: 'Revisa tus datos personales.',
    };
  }

  const stepTwoValidated = stepTwoSchema.safeParse(destination);
  if (!stepTwoValidated.success) {
    return {
      redirect: ROUTES.ADD.STEP_TWO,
      errorMsg: "Revisa tu foto",
    };
  }

  const stepThreeValidated = stepThreeSchema.safeParse(destination);
  if (!stepThreeValidated.success) {
    return {
      redirect: ROUTES.ADD.STEP_THREE,
      errorMsg: 'Revisa tu perpetrador.',
    };
  }

  const { photo_id, technology_id, perpetrator_id, name, age } = destination;
  const isSlugAvailable = !(await devstinationRepository.getBySlug(name)).length;
  const nameSlugified = slugify(name.slice(0, 15))
  const slug = isSlugAvailable ? nameSlugified : `${nameSlugified}-${nanoid(6)}`;

  const newDevstination = {
    name,
    age: Number(age),
    slug,
    photo_id,
    evilDev: [perpetrator_id],
    technology: [technology_id],
    user_id: userId
  }
  await devstinationRepository.create(newDevstination);
  const retVal = { success: true, redirect: ROUTES.DEVSTINO, slug};
  
  return retVal;
};
