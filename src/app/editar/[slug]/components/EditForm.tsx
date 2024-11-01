'use client';

import Input from '@/components/Input';
import { useFormState, useFormStatus } from 'react-dom';
import { updateValue, type FormState } from '../actions';
import { type DevstinationDTO } from '@/types';
import { FormHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { ButtonGroup, ButtonGroupItem } from '@/components/ui/ButtonGroup';
import Icon, {type IconId} from '@/components/Icon';
import { redirect } from 'next/navigation';
import { useUserDataContext } from '@/context/user';
import { ROUTES } from '@/enums';
import { newDestinationSchema, type EditDestinationInitialValuesType } from "@/schemas/destination";
import { CldImage,
  CldUploadWidget,
  type CldUploadWidgetProps,
  type CloudinaryUploadWidgetInfo,
  type CloudinaryUploadWidgetOptions
} from 'next-cloudinary';
import { envClient } from '@/env/clientEnv';
import { useToast } from '@/hooks/use-toast';
import clsx from 'clsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generatePlaceHolder } from '@/app/actions';
import { getRandomValueId } from '@/lib/utils';

type InputData = {
  name: string,
  id: string
}

type Props = {
  technologies: InputData[],
  devstino: DevstinationDTO,
  evilDevs: InputData[],
  blurData: string
}
interface InlineFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode,
  isDisabled?: boolean
}

type SaveBtnProps = {
  disabled?: boolean,
  text?: string,
  className?: string,
  onClick?: () => void,
  type?: 'submit' | 'button'
}

const initialState: FormState = {serverErrors: {}};

const WIDGET_OPTIONS: CloudinaryUploadWidgetOptions = {
  sources: ['camera', 'local', 'google_drive', 'url'],
  maxFiles: 1,
  multiple: false,
  resourceType: 'image',
  cropping: true,
  showSkipCropButton: false,
  croppingAspectRatio: 1,
  maxImageWidth: 1200,
  minImageWidth: 800,
  croppingShowDimensions: true,
} as const

const SaveButton = ({disabled, text, className, onClick, type="submit"}: SaveBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`
        ${pending ? 'animate-pulse [&:disabled]:bg-red-700' : ''}
        rounded-lg bg-red-800 py-4 px-3 text-sm text-zinc-300 
        disabled:bg-zinc-600 sm:text-xl transition-colors 
        hover:bg-red-700 mb-1 ${className}
      `}
      type={type}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {text ? text : 'Guardar'}
    </button>
  )
}

const InlineForm = ({children, isDisabled, className, ...props}: InlineFormProps) => {
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const handleFormChange = ({ currentTarget}: React.FormEvent<HTMLFormElement>) => {
    setIsValidForm(currentTarget.checkValidity());
  }

  return (
    <form
      {...props}
      onChange={handleFormChange}
      className={clsx(className, 'flex w-full gap-4 items-center')}
    >
      {children}
      <SaveButton disabled={!isValidForm || isDisabled}/>
    </form>
  )
}

export default function EditForm({technologies, devstino, evilDevs, blurData}: Props) {
  const { $id, age, evilDev, name, photo_id, technology, user_id,  } = devstino
  const { userData, dataLoaded } = useUserDataContext();
  const [ isUploading, setIsUploading ] = useState(false)
  const updateValueWithID =  updateValue.bind(null, $id, userData.devstinationSlug!);
  const [{ serverErrors, updatedData}, formAction] = useFormState(
    updateValueWithID,
    initialState
  );
  const { toast } = useToast()


  const initialValues: EditDestinationInitialValuesType = {
    age,
    name,
    perpetrator_id: evilDev[0].$id,
    photo_id,
    photo_url: "",
    technology_id: technology[0].$id
  }
  const [devstinoVal, setDevstinoVal] = useState<EditDestinationInitialValuesType>(initialValues)

  useEffect(() => {
    if (dataLoaded && userData.id !== user_id) {
      redirect(`${ROUTES.HOME}`)
    }
  }, [dataLoaded, userData.id, user_id])

  useEffect(() => {
    const errorToast = {
      variant: "destructive",
      title: "Error",
      description: "Ocurrio un error guardando los cambios. Por favor, intenta de nuevo.",
    } as const
    const successToast = {
      title : "Guardado",
      description: "Los cambios se han guardado correctamente",
      duration: 3000
    } as const

    if (!!Object.keys(serverErrors ?? {}).length) {
      toast(errorToast)
      return
    }
    if (updatedData) toast(successToast)
    if (updatedData?.photo_id) setIsUploading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverErrors, updatedData])

  const handleUplPhotoSuccess: CldUploadWidgetProps['onSuccess'] = async (result) => {
    const { public_id, url } = result.info as CloudinaryUploadWidgetInfo
    setDevstinoVal(prevVal => ({...prevVal, photo_id: public_id, photo_url: url}))
    await generatePlaceHolder(public_id)

    const formData = new FormData()
    formData.append('photo_id', public_id)
    formAction(formData)
  }

  const handleUplPhotoError: CldUploadWidgetProps['onError'] = (err ,widget) => {
    widget.close()
    console.error(err)
    toast({
      variant: "destructive",
      title: "Error",
      description: "Ocurrio un error al subir la imagen. Por favor, intenta de nuevo.",
    })
  }

  const isSameValue = (key:  keyof EditDestinationInitialValuesType): boolean => {
    if (updatedData && updatedData[key]) {
      return updatedData[key] === devstinoVal[key]
    }
    return initialValues[key] === devstinoVal[key]
  }

  const handleSelectChange = (value: string):void => {
    if (value) {
      const perpetrator_id = value === "random" ? getRandomValueId(evilDevs.map(({id, name}) => ({$id: id, name}))) : value
      setDevstinoVal(prevVal => ({...prevVal, perpetrator_id }))
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-8 lg:max-w-[700px]">
        <InlineForm action={formAction} isDisabled={!dataLoaded || isSameValue('name') }>
        <Input
          className='w-full'
          schema={newDestinationSchema.shape.name}
          label="Nombre"
          id='name'
          name='name'
          type="text"
          minLength={3}
          maxLength={15}
          required
          errorMsg={serverErrors?.name}
          value={devstinoVal.name}
          onChangeValue={(value) => setDevstinoVal(prevVal => ({...prevVal, name: value}))}
          isLoading={!dataLoaded}
        />
        </InlineForm>
        <InlineForm action={formAction} isDisabled={!dataLoaded || isSameValue('age')}>
        <Input
          className='w-full'
          schema={newDestinationSchema.shape.age}
          label="Edad"
          type="number"
          id='age'
          name='age'
          min={1}
          max={100}
          required
          step={1}
          errorMsg={serverErrors?.age}
          value={devstinoVal.age || ""}
          onChangeValue={(value) => setDevstinoVal(prevVal => ({...prevVal, age: parseInt(value || "0")}))}
          isLoading={!dataLoaded}
        />
        </InlineForm>
        <legend className="block text-lg pb-1">Tecnología</legend>
        <InlineForm
          action={formAction}
          isDisabled={!dataLoaded || isSameValue('technology_id')}
          className='max-sm:flex-col max-sm:gap-1'
        >
          <ButtonGroup
            required
            name='technology_id'
            value={devstinoVal.technology_id}
            onValueChange={(value) => setDevstinoVal(prevVal => ({...prevVal, technology_id: value}))}
            className='flex-wrap'
            errorMsg={serverErrors?.technology_id}>
            {technologies.map(({name, id}) => (
              <ButtonGroupItem
                key={id}
                value={id}
                className='flex-[1_1_85px]'
                icon={<Icon id={name as IconId} size={65}/>}
                title={name}
              />
            ))}  
          </ButtonGroup>
        </InlineForm >
        <hr className='my-4 w-full border-zinc-500' />
        <div className="w-full flex items-center flex-col sm:flex-row justify-between">
          <CldImage
            src={devstinoVal.photo_id}
            width="300"
            height="300"
            blurDataURL={blurData}
            placeholder="blur"
            alt='Foto del usuario'
            crop={'fill'}
            data-loaded='false'
            className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-300 mb-4 sm:mb-0"
            onLoad={event => {
              event.currentTarget.setAttribute('data-loaded', 'true')
            }}
          />
          <CldUploadWidget
            uploadPreset={envClient.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onError={handleUplPhotoError}
            onSuccess={handleUplPhotoSuccess}
            onQueuesStart={() => setIsUploading(true)}
            options={WIDGET_OPTIONS}
          >
            {({ open }) => (
              <SaveButton
                onClick={() => open()}
                disabled={!dataLoaded || isUploading}
                text="Cambiar foto"
                type='button'
              />
            )}
          </CldUploadWidget>
        </div>
      <hr className='my-4 w-full border-zinc-500' />
      <InlineForm action={formAction} isDisabled={!dataLoaded || isSameValue('perpetrator_id')}>
        <legend className={clsx("block text-lg pb-1", {"animate-pulse": !dataLoaded})}>Perpetrador</legend>
        <Select
          required
          disabled={!dataLoaded}
          onValueChange={handleSelectChange}
          value={devstinoVal.perpetrator_id}
          name='perpetrator_id'
        >
          <SelectTrigger
            className={clsx(
              "w-full text-black transition-all",
              {"animate-pulse cursor-not-allowed bg-zinc-600 text-zinc-600 border-zinc-600": !dataLoaded}
            )}
          >
            <SelectValue placeholder="Elige tu rival"/>
          </SelectTrigger>
          <SelectContent>
            {evilDevs.map(({id, name}) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
            <SelectItem value="random">Random Dev</SelectItem>
          </SelectContent>
        </Select>
        <div className="min-h-8 mt-1">
          {!!serverErrors?.perpetrator_id && (
            <span className="text-red-500 text-sm block">{serverErrors?.perpetrator_id}</span>
          )}
        </div>
      </InlineForm>
      </div>
    </section>
  );
}
