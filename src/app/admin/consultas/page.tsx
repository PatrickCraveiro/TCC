import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarDays } from "lucide-react";
import { opcoesClinicas } from "@/lib/data/clinicas";
import { listarConsultas } from "@/lib/data/consultas";
import { nomeEspecialidade } from "@/lib/constants";
import { formatarData, horaDe } from "@/lib/datas";
import { CancelarConsulta } from "@/components/cancelar-consulta";
import { SelectUrl } from "@/components/filtros-url";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { TabelaSkeleton } from "@/components/tabela-skeleton";
import { Card } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarcarRealizada } from "./acoes-consulta";

export const metadata: Metadata = { title: "Consultas" };

type Props = PageProps<"/admin/consultas">;

const OPCOES_STATUS = [
  { valor: "agendada", rotulo: "Agendadas" },
  { valor: "realizada", rotulo: "Realizadas" },
  { valor: "cancelada", rotulo: "Canceladas" },
];

export default function ConsultasPage({ searchParams }: Props) {
  return (
    <>
      <PageHeader titulo="Consultas" descricao="Agenda de todas as clínicas, com a pré-triagem de cada paciente." />
      <Card className="gap-0 py-0">
        <Suspense fallback={<Skeleton className="m-4 h-8 w-80" />}>
          <Filtros />
        </Suspense>
        <Suspense fallback={<TabelaSkeleton colunas={6} />}>
          <TabelaConsultas searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}

async function Filtros() {
  const clinicas = await opcoesClinicas();
  return (
    <div className="flex flex-col gap-2 border-b p-4 sm:flex-row">
      <SelectUrl parametro="status" rotuloTodos="Todos os status" opcoes={OPCOES_STATUS} />
      <SelectUrl
        parametro="clinica"
        rotuloTodos="Todas as clínicas"
        opcoes={clinicas.map((c) => ({ valor: c.id, rotulo: c.nome }))}
        className="sm:w-56"
      />
    </div>
  );
}

async function TabelaConsultas({ searchParams }: Pick<Props, "searchParams">) {
  const { status, clinica } = await searchParams;
  const texto = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);
  const consultas = await listarConsultas({ status: texto(status), clinicaId: texto(clinica) });

  if (!consultas.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarDays />
          </EmptyMedia>
          <EmptyTitle>Nenhuma consulta encontrada</EmptyTitle>
          <EmptyDescription>Quando os pacientes agendarem, as consultas aparecem aqui.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Data</TableHead>
          <TableHead>Paciente</TableHead>
          <TableHead>Clínica</TableHead>
          <TableHead>Especialidade e triagem</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="pr-4" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {consultas.map((c) => {
          const data = new Date(c.data);
          return (
            <TableRow key={c.id}>
              <TableCell className="pl-4 tabular-nums">
                <span className="block font-medium">{formatarData(data)}</span>
                <span className="text-xs text-muted-foreground">{horaDe(data)}</span>
              </TableCell>
              <TableCell>
                <span className="block font-medium">{c.paciente.nome}</span>
                <span className="text-xs text-muted-foreground">{c.paciente.email}</span>
              </TableCell>
              <TableCell>{c.clinica.nome}</TableCell>
              <TableCell className="max-w-72 whitespace-normal">
                <span className="block">{nomeEspecialidade(c.especialidade)}</span>
                {(c.sintomas.length > 0 || c.observacoes) && (
                  <span className="line-clamp-2 text-xs text-muted-foreground" title={c.observacoes || undefined}>
                    {[c.sintomas.join(", "), c.observacoes].filter(Boolean).join(" — ")}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={c.status} passou={c.passou} />
              </TableCell>
              <TableCell className="pr-4">
                {c.status === "agendada" && (
                  <div className="flex justify-end gap-1">
                    <MarcarRealizada id={c.id} />
                    <CancelarConsulta
                      id={c.id}
                      compacto
                      descricao={`Consulta de ${c.paciente.nome} em ${formatarData(data)} às ${horaDe(data)}`}
                    />
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
