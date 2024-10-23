import { devstinationRepository } from "@/lib/db";
import DestinationText from "./components/DestinationText";
import DestinationImg from "./components/DestinationImg";
import type { Metadata } from 'next'
import { getCldOgImageUrl } from "next-cloudinary";
 
type Props = {
  params: Promise<{ slug: string }>
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = (await params)
 
  const [devstinoDTO] = await devstinationRepository.getBySlug(slug);
  const { name, description, photo_id } = devstinoDTO

  const url = getCldOgImageUrl({
    src: photo_id,
  })
  
 
  return {
    title: `DevStino - ${name}`,
    description: description ? `${description.slice(0, 20)}...` : `Conoce el DevStino Final de ${name}`,
    openGraph: {
      images: [{
        url: url,
        width: 600,
        height: 600
      }],
    },
  }
}


export default async function Page({ params }: { params: { slug: string } }) {
  const [devstinoDTO] = await devstinationRepository.getBySlug(params.slug);
  const { name, photo_id} = devstinoDTO
  
  return (
    <div className="w-full px-2 lg:px-0 text-white">
      <div>
        <h1 className="text-4xl lg:text-5xl font-se7en text-zinc-300">{name}</h1>
        <DestinationImg photo_id={photo_id} name={name} />
      </div>
      <DestinationText {... devstinoDTO} />
    </div>
  );
}