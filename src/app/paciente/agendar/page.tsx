import type { Metadata } from "next";
import { Suspense } from "react";
import { listarClinicas } from "@/lib/data/clinicas";
import { PageHeader } from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { AgendamentoWizard } from "./agendamento-wizard";

export const metadata: Metadata = { title: "Agendar consulta" };

export default function AgendarPage() {
  return (
    <>
      <PageHeader
        titulo="Agendar consulta"
        descricao="Escolha a clínica, faça a pré-triagem e reserve um horário livre."
      />
      <Suspense fallback={<Skeleton className="h-[32rem] rounded-xl" />}>
        <Wizard />
      </Suspense>
    </>
  );
}

async function Wizard() {
  const clinicas = await listarClinicas();
  // O "agora" vem do servidor para o calendário e a validação usarem o mesmo relógio.
  return <AgendamentoWizard clinicas={clinicas} agoraISO={new Date().toISOString()} />;
}
