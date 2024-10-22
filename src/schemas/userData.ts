import z from 'zod';

export const userDataSchema = z.object({
  //id: z.string(),
  id: z.string().nanoid(),
  devstinationSlug: z.string().optional(),
});

export const userDataInitialValuesSchema = z.object({
  id: z.string().nanoid().optional(),
  //id: z.string().optional(),
  devstinationSlug: z.string().optional(),
});

export type UserDataType = z.infer<typeof userDataSchema>;
export type UserDataInitialValuesType = z.infer<
  typeof userDataInitialValuesSchema
>;
