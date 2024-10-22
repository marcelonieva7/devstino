import { z } from "zod"

const envServerSchema = z.object({
  APPWRITE_URL: z.string().url(),
  APPWRITE_PROJECT: z.string(),
  APPWRITE_ASSETS_BUCKET_ID: z.string(),
  APPWRITE_DB_ID: z.string(),
})

export const envServer = envServerSchema.parse(process.env)


