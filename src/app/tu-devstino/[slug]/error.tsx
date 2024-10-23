"use client"

import { ROUTES } from "@/enums";
import Link from "next/link";

export default function Error() {
  return (
    <div className="w-full flex items-center flex-col justify-center pt-14">
      <h1 className="text-4xl text-zinc-300 pb-4">Error, Devstino no encontrado</h1>
      <Link
        className="text-xl text-zinc-300 bg-red-800 px-5 py-3 rounded-xl hover:bg-red-700 hover:text-zinc-100 transition-colors flicker-in-glow"
        href={ROUTES.HOME}
      >
        Regresar
      </Link>
    </div>
  );
}