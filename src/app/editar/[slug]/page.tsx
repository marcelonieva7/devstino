import { devstinationRepository, evilDevsRepository, technologiesRepository } from "@/lib/db";
import EditForm from "./components/EditForm";
import { generatePlaceHolder } from "@/app/actions";

export default async function Page({ params } : { params : { slug: string}}) {
  const [devstino] = await devstinationRepository.getBySlug(params.slug);
  const technologies = (await technologiesRepository.getAll()).map(({name, $id}) => ({name, id: $id}))
  const evilDevs = (await evilDevsRepository.getAll()).map(({name, $id}) => ({name, id: $id}))

  if (!devstino || devstino?.isDeleted) return <p className="text-zinc-500 text-xl">No encontrado</p>
  const blurData = await generatePlaceHolder(devstino.photo_id)

  return (
    <EditForm devstino={devstino} technologies={technologies} evilDevs={evilDevs} blurData={blurData} />
  )

}