import ReviewForm from "./ReviewForm";
import { evilDevsRepository, technologiesRepository } from "@/lib/db";

export default async function Page() {
  const evilDevs = await evilDevsRepository.getAll()
  const technologies = await technologiesRepository.getAll()
  
  return (
    <div>
      <ReviewForm evilDevs={evilDevs} technologies={technologies} />
    </div>
  );
}