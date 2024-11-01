import z from 'zod';

export const stepOneSchema = z.object({
  name: z
    .string()
    .min(3, 'Tipea al menos tres letras vago')
    .max(15, '¿Para que queres mas de 15 caracteres? Dale'),
  age: z
    .coerce
    .number()
    .min(1, 'Ingresa una edad de al menos 1 año, si es que sos un super prodigio')
    .max(100, 'No existen devs de más de 100 años'),
  technology_id: z.string(),
});

export const stepTwoSchema = z.object({
  photo_id : z.string(),
  photo_url : z.string().url(),
});

export const stepThreeSchema = z.object({
  perpetrator_id: z.string(),
});

export const newDestinationSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
});

export const newDestinationInitialValuesSchema = z.object({
  name: z.string().optional(),
  age: z.coerce.number().optional(),
  technology_id: z.string().optional(),
  photo_id: z.string().optional(),
  photo_url: z.string().optional(),
  perpetrator_id: z.string().optional(),
});

export const editDestinationInitialValuesSchema = newDestinationInitialValuesSchema.required();

export type NewDestinationType = z.infer<typeof newDestinationSchema>;
export type NewDestinationInitialValuesType = z.infer<
  typeof newDestinationInitialValuesSchema
>;

export type EditDestinationInitialValuesType = z.infer<
  typeof editDestinationInitialValuesSchema
>;
