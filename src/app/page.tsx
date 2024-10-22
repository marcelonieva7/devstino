"use client"
import PageHeader from "@/components/PageHeader";
import { useUserDataContext } from "@/context/user";
import { ROUTES } from "@/enums";
import Link from "next/link";

export default function Page() {
  const {userData, dataLoaded} = useUserDataContext();
  const {devstinationSlug} = userData;

  return (
    <section className="w-full px-2 lg:px-0 flex gap-12 flex-col mt-24">
      <div>
      <PageHeader
        title="Encuentra tu DevStino"
        subtitle="El destino es inevitable, pero si te atreves puedes obtener claridad"
      />
      </div>
      {dataLoaded && <Link
        href={devstinationSlug ? `${ROUTES.DEVSTINO}/${userData.devstinationSlug}` : ROUTES.ADD.STEP_ONE}
        className="self-start text-zinc-300 text-xl bg-red-800 px-7 py-4 rounded-xl hover:bg-red-600
          hover:text-zinc-100 transition-colors flicker-in-glow"
      >
        Tu devstino te espera
      </Link>}
    </section>
  )
}