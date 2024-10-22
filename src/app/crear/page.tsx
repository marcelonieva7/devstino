import { redirect } from 'next/navigation';
import { ROUTES } from '@/enums';

export default function Page() {
  redirect(ROUTES.ADD.STEP_ONE)  
}