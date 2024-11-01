import PageHeader from "@/components/PageHeader";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'DevStino Final - Editar',
}


export default function AddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-2 lg:px-0">
      <PageHeader
        title="Edita tus datos"
      />

      <div className="mt-20 mb-28 flex flex-col gap-x-16 text-white lg:flex-row">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}