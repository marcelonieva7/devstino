"use server"
import { unstable_cache } from "next/cache"
import { getPlaiceholder } from "plaiceholder";
import { getCldImageUrl } from "next-cloudinary";

const generatePlaceHolderCached = unstable_cache(async (photoId: string) => {
  const src = getCldImageUrl({
    width: 100,
    height: 100,
    src: photoId,
  });
  
  const buffer = await fetch(src).then( async (res) => {
    return Buffer.from(await res.arrayBuffer());
  })

  const { base64 } = await getPlaiceholder(buffer);

  return base64  
})

export async function generatePlaceHolder(photoId: string) {
  return await generatePlaceHolderCached(photoId)
}
