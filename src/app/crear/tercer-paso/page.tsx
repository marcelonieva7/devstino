import StepThreeForm from './StepThreeForm';
import { evilDevsRepository } from '@/lib/db';
export default async function Page() {
  const documents = await evilDevsRepository.getAll()
  const evilDevs = documents.map(({name, $id}) => ({name, $id}))

  return (
    <div>
      <StepThreeForm evilDevs={evilDevs} />
    </div>
  );
}