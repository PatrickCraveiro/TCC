import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus, Users } from "lucide-react";
import { opcoesClinicas } from "@/lib/data/clinicas";
import { listarFuncionarios } from "@/lib/data/funcionarios";
import { CARGOS } from "@/lib/constants";
import { formatarData } from "@/lib/datas";
import { formatarCPF } from "@/lib/format";
import { BuscaUrl, SelectUrl } from "@/components/filtros-url";
import { PageHeader } from "@/components/page-header";
import { TabelaSkeleton } from "@/components/tabela-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ExcluirFuncionario, FuncionarioDialog } from "./funcionario-dialog";

export const metadata: Metadata = { title: "Funcionários" };

type Props = PageProps<"/admin/funcionarios">;

export default function FuncionariosPage({ searchParams }: Props) {
  return (
    <>
      <PageHeader titulo="Funcionários" descricao="Equipe de cada clínica, com cargo e data de admissão.">
        <Suspense
          fallback={
            <Button disabled>
              <Plus /> Novo funcionário
            </Button>
          }
        >
          <BotaoNovo />
        </Suspense>
      </PageHeader>
      <Card className="gap-0 py-0">
        <Suspense fallback={<Skeleton className="m-4 h-8 w-80" />}>
          <Filtros />
        </Suspense>
        <Suspense fallback={<TabelaSkeleton colunas={5} />}>
          <TabelaFuncionarios searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}

async function BotaoNovo() {
  return <FuncionarioDialog clinicas={await opcoesClinicas()} />;
}

async function Filtros() {
  const clinicas = await opcoesClinicas();
  return (
    <div className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:flex-wrap">
      <BuscaUrl placeholder="Buscar por nome, e-mail ou CPF" />
      <SelectUrl
        parametro="clinica"
        rotuloTodos="Todas as clínicas"
        opcoes={clinicas.map((c) => ({ valor: c.id, rotulo: c.nome }))}
        className="sm:w-56"
      />
      <SelectUrl
        parametro="cargo"
        rotuloTodos="Todos os cargos"
        opcoes={CARGOS.map((c) => ({ valor: c, rotulo: c }))}
      />
    </div>
  );
}

async function TabelaFuncionarios({ searchParams }: Pick<Props, "searchParams">) {
  const { q, clinica, cargo } = await searchParams;
  const texto = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);
  const filtrando = Boolean(q || clinica || cargo);

  const [funcionarios, clinicas] = await Promise.all([
    listarFuncionarios({ busca: texto(q), clinicaId: texto(clinica), cargo: texto(cargo) }),
    opcoesClinicas(),
  ]);

  if (!funcionarios.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users />
          </EmptyMedia>
          <EmptyTitle>{filtrando ? "Nenhum funcionário encontrado" : "Nenhum funcionário cadastrado"}</EmptyTitle>
          <EmptyDescription>
            {filtrando ? "Ajuste os filtros para ver mais resultados." : "Cadastre a equipe das clínicas."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="pl-4">Nome</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Clínica</TableHead>
          <TableHead>Admissão</TableHead>
          <TableHead className="w-24 pr-4" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {funcionarios.map((f) => (
          <TableRow key={f.id}>
            <TableCell className="pl-4">
              <span className="block font-medium">{f.nome}</span>
              <span className="text-xs text-muted-foreground">{f.email}</span>
            </TableCell>
            <TableCell className="font-mono text-xs">{formatarCPF(f.cpf)}</TableCell>
            <TableCell>
              <Badge variant="secondary">{f.cargo}</Badge>
            </TableCell>
            <TableCell>{f.clinicaNome}</TableCell>
            <TableCell className="tabular-nums">{formatarData(`${f.dataContratacao}T12:00:00-03:00`)}</TableCell>
            <TableCell className="pr-4">
              <div className="flex justify-end gap-0.5">
                <FuncionarioDialog funcionario={f} clinicas={clinicas} />
                <ExcluirFuncionario funcionario={f} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
