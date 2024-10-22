import PageHeader from "@/components/PageHeader";
import StepNavigation from "@/components/StepNavigation";
import { AddDestinationContextProvider } from "@/context/addDestination";

export default function AddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-2 lg:px-0">
      <PageHeader
        title="Encuentra tu Devstino"
        subtitle="Carga tus datos y preparate para saber tu futuro"
      />

      <div className="mt-20 mb-28 flex flex-col gap-x-16 text-white lg:flex-row">
        <StepNavigation />
        <AddDestinationContextProvider>
          <div className="w-full">{children}</div>
        </AddDestinationContextProvider>
      </div>
    </div>
  );
}