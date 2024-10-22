"use client"

import { z } from "zod"

const envClientSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
})

export const envClient = envClientSchema.parse({
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
})
