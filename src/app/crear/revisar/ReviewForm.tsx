'use client';
import { useEffect, useState, type FC } from 'react';
import SubmitButton from '@/components/SubmitButton';
import { submitDestinationAction } from './actions';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { useAddDestinationContext } from '@/context/addDestination';
import { type NewDestinationType } from '@/schemas/destination';
import { useUserDataContext } from '@/context/user';
import clsx from 'clsx';
import { EvilDevsDTO, TechnologyDTO } from '@/types';
import { CldImage } from 'next-cloudinary';
import Icon from '@/components/Icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';

type FormItemProps = {
  label: string;
  text?: string | number;
  isLoading: boolean;
}

type ReviewFormProps = {
  evilDevs: EvilDevsDTO[],
  technologies: TechnologyDTO[]
}

const FormItem:FC<FormItemProps> = ({label, text, isLoading}) => (
  <p className="text-zinc-500 py-4 md:text-lg max-w-full">
    {label}: <span
      className={
        clsx("text-white/90 break-all",
          { "animate-pulse h-4 bg-gray-200 inline-block rounded w-1/2 relative top-1": isLoading }
        )}
    >{text}</span>
  </p>
) 

export default function ReviewForm({evilDevs, technologies }: ReviewFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { newDestinationData, resetLocalStorage, dataLoaded } = useAddDestinationContext();
  const { userData, dataLoaded: userDataLoaded , updateUserData} = useUserDataContext();

  const { name, age, perpetrator_id, photo_url, technology_id, photo_id } = newDestinationData

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleFormSubmit = async () => {
    const res = await submitDestinationAction(newDestinationData as NewDestinationType, userData.id as string);
    const { redirect, errorMsg, success, slug } = res;

    if (success) {
      toast({
        variant: "default",
        description: "En breve conoceras tu devstino"
      })
      updateUserData({
        devstinationSlug: slug
      })
      resetLocalStorage();
    } else if (errorMsg) {
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMsg,
      })
    }
    if (redirect) {
      const route = slug ? `${redirect}/${slug}` : redirect;
      return router.push(route);
    }
  };

  const handleCopy = () => {
    if (photo_url && navigator.clipboard) navigator.clipboard.writeText(photo_url);    
  }

  const isLoading = !dataLoaded && !userDataLoaded;
  const evilDevName = perpetrator_id ? evilDevs.find(({$id}) => $id === perpetrator_id)?.name : undefined;
  const technologyName = technology_id ? technologies.find(({$id}) => $id === technology_id)?.name : undefined;

  return (
    <form
      action={handleFormSubmit}
      className="flex flex-1 flex-col gap-2 items-stretch lg:max-w-[700px]"
    >
      <div className='pb-2'>
      {photo_id &&
        <CldImage
          src={photo_id}
          width="250"
          height="250"
          data-loaded='false'
          className="data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-300"
          onLoad={event => {
            event.currentTarget.setAttribute('data-loaded', 'true')
          }}
          alt='Foto del usuario'
          zoompan={{
            loop: false,
            options: 'mode_ofr;maxzoom_2;du_4;'
          }}
        />
      }
      </div>
      <p className={clsx("text-xl text-zinc-500 md:text-3xl pb-2")}>
        Nombre: <span className={clsx("text-white/90", {"animate-pulse h-7 bg-gray-200 inline-block rounded w-1/4 relative top-1" : !dataLoaded })}>{name}</span>
      </p>
      {photo_url &&
      <div className='flex gap-1'>
        <FormItem label="Url de la Foto" text={photo_url} isLoading={!dataLoaded} />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <Icon id="copy" size={25} onClick={handleCopy} title='Copiar Url de la foto'/>
          </PopoverTrigger>
          <PopoverContent className='w-auto py-1 px-2 bg-gray-800 text-white align-center' side='top'>Url Copiada</PopoverContent >
        </Popover>
      </div>}
      <FormItem label="Edad" text={age} isLoading={!dataLoaded} />
      <FormItem label="Tecnologia amiga" text={technologyName} isLoading={!dataLoaded} />
      <FormItem label="Perpetrador" text={evilDevName} isLoading={!dataLoaded} />
      <SubmitButton text={isLoading ? "Cargando..." : "Conoce tu DevStino"} disabled={isLoading}/>
    </form>
  );
}