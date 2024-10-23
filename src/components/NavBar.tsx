"use client"

import { useUserDataContext } from "@/context/user";
import { ROUTES } from "@/enums";
import clsx from "clsx";
import Link from "next/link";
import Audio from "@/components/Audio";
import path from "path";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const {userData, dataLoaded} = useUserDataContext()
  const pathname = usePathname()
  const TITLES = ["Home", "Crear", "Tu Devstino"] as const;
  const isDevstino = !!userData.devstinationSlug
  const currentPath = path.dirname(pathname)
  const devstino = `${ROUTES.DEVSTINO}/${userData.devstinationSlug}`

  return (
    <nav>
      <ul className="text-zinc-300 flex justify-between gap-4 px-4 py-5 after:bg-zinc-800 underline-offset-4">
        <Link className={clsx("text-xl hover:underline hover:text-red-500 transition-colors self-start", {"text-red-700": pathname === ROUTES.HOME})} href={ROUTES.HOME}>{TITLES[0]}</Link>          
        <Link
          className={clsx("text-xl hover:underline hover:text-red-500 transition-colors self-start", {
            "bg-gray-600 rounded-lg inline-block w-40 animate-pulse text-gray-600 pointer-events-none": !dataLoaded,
            "text-red-700": currentPath === path.dirname(ROUTES.ADD.STEP_ONE) || pathname === devstino
          })}
          href={ isDevstino ? devstino : ROUTES.ADD.STEP_ONE}
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