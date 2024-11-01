import { devstinationRepository } from "@/lib/db";
import DestinationText from "./components/DestinationText";
import DestinationImg from "./components/DestinationImg";
import type { Metadata } from 'next'
import { getCldOgImageUrl } from "next-cloudinary";
import Delete from "./components/Delete";
import Share from "./components/Share";
import Link from "next/link";
import { ROUTES } from "@/enums";
import Edit from "./components/Edit";
import { generatePlaceHolder } from "@/app/actions";

export async function generateStaticParams() {
  return [];
}
export const dynamic = "force-static"
 
type Props = {
  params: Promise<{ slug: string }>
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = (await params)
 
  //const devstino = await getDevstinoCached(slug)
  const [devstinoDTO] = await devstinationRepository.getBySlug(slug);
  if (!devstinoDTO) {
    return {
      title: `DevStino - Error`,
      description: `Error, Devstino no encontrado`
    }
  }
  const { name, description, photo_id } = devstinoDTO

  const url = getCldOgImageUrl({src: photo_id})
 
  return {
    title: `DevStino - ${name}`,
    description: description ? `${description.slice(0, 40)}...` : `Conoce el DevStino Final de ${name}`,
    openGraph: {
      images: [{
        url: url,
        width: 600,
        height: 600
      }],
    },
  }
}

const NotFound = () => {
  return (
    <div className="w-full flex items-center flex-col justify-center pt-14">
    <h1 className="text-4xl text-zinc-300 text-center pb-4">Error, Devstino no encontrado, la clarividencia que solicitaste no existe</h1>
    <Link
      className="text-xl mt-5 text-zinc-300 bg-red-800 px-5 py-3 rounded-xl hover:bg-red-700 hover:text-zinc-100 transition-colors flicker-in-glow"
      href={ROUTES.HOME}
    >
      Regresa por tu devstino
    </Link>
  </div>
  )
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [devstinoDTO] = await devstinationRepository.getBySlug(params.slug);
  if (!devstinoDTO || devstinoDTO?.isDeleted) return <NotFound />
  const { name, photo_id, $id, user_id, slug } = devstinoDTO
  const blurData = await generatePlaceHolder(photo_id)
  
  return (
    <div
      className={`
        w-full p-2 sm:px-6 sm:py-4 lg:px-12 text-white bg-gray-950/35 bg-cover bg-fixed
        rounded-sm shadow-2xl shadow-red-800/40 min-h-screen bg-[url('/images/bg_splatter.svg')]
      `}
    >
      <div className="flex justify-end sm:mt-3 gap-6 items-center flicker-in-glow">
        <Share name={name} />
        <Edit slug={slug} />
        <Delete id={$id} userId={user_id} slug={slug} />
      </div>
      <div>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-gotHeroin text-zinc-300">
          {name.split('').map((word, i) => (
            <span className={ i % 2 ? `text-gray-300` : `text-zinc-500` } key={i}>{word}</span>
          ))}
        </h1>
        <DestinationImg photo_id={photo_id} blurData={blurData} name={name} />
      </div>
      <DestinationText {... devstinoDTO} />
    </div>
  );
}