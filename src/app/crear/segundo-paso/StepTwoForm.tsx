'use client';

import Input from '@/components/Input';
import { useFormState } from 'react-dom';
import { stepTwoFormAction } from './actions';
import { FormErrors } from '@/types';
import SubmitButton from '@/components/SubmitButton';
import { CldUploadWidget, type CloudinaryUploadWidgetInfo, type CloudinaryUploadWidgetOptions, CldUploadWidgetProps, CldImage } from 'next-cloudinary';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { envClient } from '@/env/clientEnv';
import { useAddDestinationContext } from '@/context/addDestination';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/enums';
import { redirect } from 'next/navigation';
import { useUserDataContext } from '@/context/user';

const WIDGET_OPTIONS: CloudinaryUploadWidgetOptions = {
  sources: ['camera', 'local', 'google_drive', 'url'],
  maxFiles: 1,
  multiple: false,
} as const

const initialState: FormErrors = {};

export default function StepTwoForm() {
  const { updateNewDestinationDetails, newDestinationData, dataLoaded } = useAddDestinationContext();
  const { dataLoaded: userDataLoaded, userData } = useUserDataContext()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [serverErrors, formAction] = useFormState(
    stepTwoFormAction,
    initialState
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast()
  const isUploadedPhoto = Boolean(newDestinationData.photo_id) && Boolean(newDestinationData.photo_url)
  
  useEffect(() => {
    if (formRef.current) {
      setIsValidForm(isUploadedPhoto);
    }
  }, [isUploadedPhoto]);

  useEffect(() => {
    if (userDataLoaded && userData.devstinationSlug) {
      redirect(`${ROUTES.DEVSTINO}/${userData.devstinationSlug}`)
    }
  }, [userDataLoaded, userData.devstinationSlug])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSuccess: CldUploadWidgetProps['onSuccess'] = (result, widget) => {
    const { public_id, url } = result.info as CloudinaryUploadWidgetInfo
    updateNewDestinationDetails({photo_url: url, photo_id: public_id})
    widget.close()
  }

  const handleCopy = () => {
    const { photo_url } = newDestinationData
    if (photo_url && navigator.clipboard) navigator.clipboard.writeText(photo_url);    
  }

  const handleDelete = () => {
    updateNewDestinationDetails({photo_url: '', photo_id: ''})
  }

  const handleError: CldUploadWidgetProps['onError'] = (err ,widget) => {
    widget.close()
    console.error(err)
    toast({
      variant: "destructive",
      title: "Error",
      description: "Ocurrio un error al subir la imagen. Por favor, intenta de nuevo.",
    })
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px] ">
      <CldUploadWidget uploadPreset={envClient.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onError={handleError} onSuccess={handleSuccess} options={WIDGET_OPTIONS}>
        {({ open }) => {
          return (
            <button hidden={isUploadedPhoto} type='button' className="mt-2 rounded-lg bg-red-800 py-4 text-md text-black lg:py-4 lg:text-xl text-zinc-300 w-full transition-colors hover:bg-red-700" onClick={() => open()}>
              Sube tu foto
            </button>
          );
        }}
      </CldUploadWidget>
      {isUploadedPhoto && (
        <div className='flex gap-2 items-center justify-between'>
          <CldImage
            src={newDestinationData.photo_id ?? ''}
            width="600"
            height="600"
            alt='Foto del usuario'
            data-loaded='false'
            className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-300"
            onLoad={event => {
              event.currentTarget.setAttribute('data-loaded', 'true')
            }}
          />
          <Icon id="delete" size={35} onClick={handleDelete} className='hover:fill-red-500 transition-colors' title='Eliminar la foto'/>
        </div>
      )}
        <Input
          label="photo_id"
          id="photo_id"
          type="text"
          hidden
          required
          readonly     
        />
        {isUploadedPhoto &&  (
        <div className='flex gap-1 align-center'>
          <Input
            label='URL'
            type="url"
            id="photo_url"
            readonly
            required
            errorMsg={serverErrors?.photo_url}
            className='flex-auto'
            
            />
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger>
                <Icon id="copy" size={25} onClick={handleCopy} title='Copiar Url de la foto'/>
              </PopoverTrigger>
              <PopoverContent className=' w-auto py-1 px-2 bg-gray-800 text-white align-center' side='top'>Url Copiada</PopoverContent >
            </Popover>
          </div>
        )}
        <SubmitButton text="Continuar" disabled={!isValidForm || !dataLoaded} />
      </div>
    </form>
  );
}