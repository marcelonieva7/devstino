'use client';

import { useFormState } from 'react-dom';
import { stepThreeFormAction } from './actions';
import { type FormErrors } from '@/types';
import SubmitButton from '@/components/SubmitButton';
import { type EvilDevsDTO } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAddDestinationContext } from '@/context/addDestination';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useUserDataContext } from '@/context/user';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/enums';

type Props = { evilDevs: Pick<EvilDevsDTO, ('name' | '$id')>[] }

const initialState: FormErrors = {};

function getRandomValueId<K extends {$id: string}>(arr: K[]): K['$id'] {
  return arr[Math.floor(Math.random() * arr.length)].$id
}

export default function StepThreeForm({ evilDevs }: Props) {
  const { updateNewDestinationDetails, newDestinationData, dataLoaded } = useAddDestinationContext();
  const { userData, dataLoaded: userDataLoaded } = useUserDataContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [ clientError, setClientError ] = useState<string>("")
  const [serverErrors, formAction] = useFormState(
    stepThreeFormAction,
    initialState
  );
  const errorMsg = serverErrors?.perpetrator_id

  useEffect(() => {
    if (dataLoaded) {
      setClientError( !newDestinationData.perpetrator_id ? "Elige un rival" : "")
    }
  }, [newDestinationData.perpetrator_id, dataLoaded])

  useEffect(() => {
    if (userDataLoaded && userData.devstinationSlug) {
      redirect(`${ROUTES.DEVSTINO}/${userData.devstinationSlug}`)
    }
  }, [userDataLoaded, userData.devstinationSlug])

  const handleSelectChange = (value: string):void => {
    if (value) {
      const perpetrator_id = value === "random" ? getRandomValueId(evilDevs) : value
      updateNewDestinationDetails({ perpetrator_id })
    }
  }

  const isDisabled = !!clientError || !dataLoaded

  return (
    <form ref={formRef} action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <fieldset>
          <legend className={clsx("block text-lg pb-1", {"animate-pulse": !dataLoaded})}>Perpetrador</legend>
          <Select required disabled={!dataLoaded} onValueChange={handleSelectChange} value={newDestinationData.perpetrator_id} name='perpetrator_id'>
            <SelectTrigger className={clsx("w-full text-black transition-all", {"animate-pulse cursor-not-allowed bg-zinc-600 text-zinc-600 border-zinc-600": !dataLoaded})}>
              <SelectValue placeholder="Elige tu rival"/>
            </SelectTrigger>
            <SelectContent>
              {evilDevs.map(({$id, name}) => (
                <SelectItem key={$id} value={$id}>
                  {name}
                </SelectItem>
              ))}
              <SelectItem value="random">Random Dev</SelectItem>
            </SelectContent>
          </Select>
          <div className="min-h-8 mt-1">
            {!!errorMsg && (
              <span className="text-red-500 text-sm block ">{errorMsg}</span>
            )}
          </div>
        </fieldset>
        <SubmitButton text="Continuar" disabled={isDisabled} />
      </div>
    </form>
  );
}