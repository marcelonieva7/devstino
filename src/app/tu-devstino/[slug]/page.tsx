import { devstinationRepository } from "@/lib/db";
import DestinationText from "./components/DestinationText";
import DestinationImg from "./components/DestinationImg";

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