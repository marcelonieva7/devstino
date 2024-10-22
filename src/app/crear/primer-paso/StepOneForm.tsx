'use client';

import Input from '@/components/Input';
import { useFormState } from 'react-dom';
import { stepOneFormAction } from './actions';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/SubmitButton';
import { useEffect, useRef, useState } from 'react';
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/ButtonGroup';
import Icon, {type IconId} from '@/components/Icon';
import { redirect } from 'next/navigation';
import { useUserDataContext } from '@/context/user';
import { ROUTES } from '@/enums';
import { useAddDestinationContext } from '@/context/addDestination';

type Technologies = {
  name: string,
  id: string
}

const initialState: FormErrors = {};

export default function StepOneForm({technologies}: {technologies: Technologies[]}) {
  const [serverErrors, formAction] = useFormState(
    stepOneFormAction,
    initialState
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { userData, dataLoaded: userDataLoaded } = useUserDataContext();
  const { dataLoaded } = useAddDestinationContext();

  useEffect(() => {
    if (userDataLoaded && userData.devstinationSlug) {
      redirect(`${ROUTES.DEVSTINO}/${userData.devstinationSlug}`)
    }
  }, [userDataLoaded, userData.devstinationSlug])

  const handleFormChange = () => {
    if (formRef.current) {
      setIsValidForm(formRef.current.checkValidity());
    }
  }

  return (
    <form autoComplete="on" ref={formRef} onChange={handleFormChange} action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <Input
          label="Nombre"
          id="name"
          type="text"
          minLength={3}
          maxLength={50}
          required
          errorMsg={serverErrors?.name}
        />
        <Input
          label="Edad"
          id="age"
          type="number"
          min={1}
          max={100}
          required
          errorMsg={serverErrors?.age}
        />
        <fieldset>
          <legend className="block text-lg pb-1">Tecnología</legend>
          <ButtonGroup required name='technology_id' className='flex-wrap' errorMsg={serverErrors?.technology_id}>
            {technologies.map(({name, id}) => (
              <ButtonGroupItem
                key={id}
                value={id}
                icon={<Icon id={name as IconId} size={65}/>}
                title={name}
              />
            ))}  
          </ButtonGroup>
        </fieldset>
        <SubmitButton text="Continuar" disabled={!isValidForm || !dataLoaded} />
      </div>
    </form>
  );
}
