"use client"

import { useUserDataContext } from "@/context/user";
import { ROUTES } from "@/enums";
import clsx from "clsx";
import Link from "next/link";

export default function NavBar() {
  const {userData, dataLoaded} = useUserDataContext()
  
  const TITLES = ["Home", "Crear", "Tu Devstino"] as const;
  const isDevstino = !!userData.devstinationSlug

  return (
    <nav>
      <ul className="text-zinc-300 flex gap-4 px-4 py-5 after:bg-zinc-800">
        <Link className="text-xl hover:underline hover:text-red-700 transition-colors" href={ROUTES.HOME}>{TITLES[0]}</Link>          
        <Link
          className={clsx("text-xl hover:underline hover:text-red-700 transition-colors", {
            "bg-gray-600 rounded-lg inline-block w-40 animate-pulse text-gray-600 pointer-events-none": !dataLoaded
          })}
          href={ isDevstino ? `${ROUTES.DEVSTINO}/${userData.devstinationSlug}` : ROUTES.ADD.STEP_ONE}
        >
          {TITLES[isDevstino ? 2 : 1]}
        </Link>
      </ul>
    </nav>
  );
}