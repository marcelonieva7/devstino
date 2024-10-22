import { Models } from 'appwrite';
import { db } from '@/app/appwrite';
import StepOneForm from './StepOneForm';
import { envServer } from '@/env/serverEnv';
import { COLLECTIONS_ID } from '@/enums';

type Technology = {
  name: string,
  description: string  
}

export default async function StepOne() {
  const { documents: docs } = await db.listDocuments<Technology & Models.Document>(envServer.APPWRITE_DB_ID, COLLECTIONS_ID.TECHNOLOGIES)
  const technologies = docs.map(({name, $id}) => ({name, id: $id}))
  
  return (
    <div>
      <StepOneForm technologies={technologies} />
    </div>
  );
}
