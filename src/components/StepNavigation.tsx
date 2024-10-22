'use client';
import Icon from '@/components/Icon';
//import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/enums';

type Step = {
  title: string;
  link: string;
};

const TITLES = ["Datos Personales", "Foto", "Perpetrador", "Revisar"] as const;
const LINKS = Object.values(ROUTES.ADD)

const STEPS: Step[] = TITLES.map((title, i) => ({
  title,
  link: LINKS[i]
}))

function isSamePath (currentPath: string, link: string):boolean {
  return currentPath === path.basename(link);
}

export default function StepNavigation() {
  const pathname = usePathname();
  const currentPath = path.basename(pathname);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(STEPS.findIndex((step) => isSamePath(currentPath, step.link)));
  }, [currentPath]);

  return (
    <div className="mb-12 mt-4 lg:mb-0 min-w-60">
      {/* back button */}
      <Link
        href={STEPS[currentStep - 1]?.link || STEPS[0].link}
        className={
          clsx(`mb-4 flex items-center gap-2 text-xl disabled:text-white/50
            lg:mb-12 lg:gap-5 max-h-[55px] transitionMaxH overflow-hidden`,
            {"max-h-[0]": !currentStep},
            {"flicker-in-glow": !!currentStep}
          )}
      >
        <Icon id="arrowBack" size={55} title='Volver atras' />
      </Link>

      {/* list of form steps */}
      <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
        {STEPS.map((step, i) => (
          <Link
            href={step.link}
            key={step.link}
            className="group z-20 flex items-center gap-3 text-2xl"
            prefetch={true}
          >
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-se7en transition-colors duration-200 lg:h-12 lg:min-w-12 lg:text-lg',
                {
                  'border-none bg-red-800 text-black group-hover:border-none group-hover:text-black':
                    isSamePath(currentPath, step.link),
                  'border-white/75 bg-gray-900 group-hover:border-white group-hover:text-white text-white/75':
                    !isSamePath(currentPath, step.link),
                }
              )}
            >
              {i + 1}
            </span>
            <span
              className={clsx(
                'hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block',
                {
                  'font-light': !isSamePath(currentPath, step.link),
                  'font-semibold text-white': isSamePath(currentPath, step.link),
                }
              )}
            >
              {step.title}
            </span>
          </Link>
        ))}
        {/* mobile background dashes */}
        <div className="absolute top-4 flex h-1 w-full border-b border-dashed lg:hidden" />
      </div>
    </div>
  );
}
