import PageHeader from '@/components/PageHeader'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <section className="w-full px-2 lg:px-0 flex gap-12 flex-col mt-24">
      <PageHeader
        title="No encontrado"
      />
      <Link
        href="/"
        className="self-start text-zinc-300 text-xl bg-red-800 px-7 py-4 rounded-xl hover:bg-red-600
          hover:text-zinc-100 transition-colors flicker-in-glow"
      >
        Regresa por tu devstino
      </Link>
    </section>
  )
}