"use client"

import { useUserDataContext } from "@/context/user";
import { ROUTES } from "@/enums";
import clsx from "clsx";
import Link from "next/link";
import Audio from "@/components/Audio";

export default function NavBar() {
  const {userData, dataLoaded} = useUserDataContext()  
  const TITLES = ["Home", "Crear", "Tu Devstino"] as const;
  const isDevstino = !!userData.devstinationSlug

  return (
    <nav>
      <ul className="text-zinc-300 flex justify-between gap-4 px-4 py-5 after:bg-zinc-800">
        <Link className="text-xl hover:underline hover:text-red-700 transition-colors self-start" href={ROUTES.HOME}>{TITLES[0]}</Link>          
        <Link
          className={clsx("text-xl hover:underline hover:text-red-700 transition-colors self-start", {
            "bg-gray-600 rounded-lg inline-block w-40 animate-pulse text-gray-600 pointer-events-none": !dataLoaded
          })}
          href={ isDevstino ? `${ROUTES.DEVSTINO}/${userData.devstinationSlug}` : ROUTES.ADD.STEP_ONE}
        >
          {TITLES[isDevstino ? 2 : 1]}
        </Link>
        <Audio
          height={40}
          width={40}
          className="ml-auto"
        />
      </ul>
    </nav>
  );
}