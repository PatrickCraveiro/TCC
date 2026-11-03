import type { Metadata } from "next";
import { Suspense } from "react";
import { Building2 } from "lucide-react";
import { listarClinicasAdmin } from "@/lib/data/clinicas";
import { formatarCEP, formatarCNPJ } from "@/lib/format";
import { BuscaUrl } from "@/components/filtros-url";
import { PageHeader } from "@/components/page-header";
import { TabelaSkeleton } from "@/components/tabela-skeleton";
import { Card } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClinicaDialog, ExcluirClinica } from "./clinica-dialog";

export const metadata: Metadata = { title: "Clínicas" };

export default function ClinicasPage({ searchParams }: PageProps<"/admin/clinicas">) {
  return (
    <>
      <PageHeader titulo="Clínicas" descricao="Unidades onde os pacientes podem agendar consultas.">
        <ClinicaDialog />
      </PageHeader>
      <Card className="gap-0 py-0">
        <div className="border-b p-4">
          <Suspense>
            <BuscaUrl placeholder="Buscar por nome, bairro, cidade ou CNPJ" />
          </Suspense>
        </div>
        <Suspense fallback={<TabelaSkeleton colunas={5} />}>
          <TabelaClinicas searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}

async function TabelaClinicas({ searchParams }: Pick<PageProps<"/admin/clinicas">, "searchParams">) {
  const { q } = await searchParams;
  const clinicas = await listarClinicasAdmin(typeof q === "string" ? q : "");

  if (!clinicas.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Building2 />
          </EmptyMedia>
          <EmptyTitle>{q ? "Nenhuma clínica encontrada" : "Nenhuma clínica cadastrada"}</EmptyTitle>
          <EmptyDescription>
            {q ? "Tente buscar por outro termo." : "Cadastre a primeira clínica para liberar o agendamento."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Clínica</TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>CEP</TableHead>
          <TableHead className="text-right">Funcionários</TableHead>
          <TableHead className="text-right">Consultas futuras</TableHead>
          <TableHead className="w-24 pr-4" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {clinicas.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="pl-4">
              <span className="block font-medium">{c.nome}</span>
              <span className="text-xs text-muted-foreground">
                {c.bairro}, {c.cidade}
              </span>
            </TableCell>
            <TableCell className="font-mono text-xs">{formatarCNPJ(c.cnpj)}</TableCell>
            <TableCell className="font-mono text-xs">{formatarCEP(c.cep)}</TableCell>
            <TableCell className="text-right tabular-nums">{c.totalFuncionarios}</TableCell>
            <TableCell className="text-right tabular-nums">{c.consultasAgendadas}</TableCell>
            <TableCell className="pr-4">
              <div className="flex justify-end gap-0.5">
                <ClinicaDialog clinica={c} />
                <ExcluirClinica clinica={c} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
