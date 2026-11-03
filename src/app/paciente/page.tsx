import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarPlus, Clock, MapPin } from "lucide-react";
import { getUsuarioAtual } from "@/lib/auth/dal";
import { listarMinhasConsultas, type ConsultaDTO } from "@/lib/data/consultas";
import { nomeEspecialidade } from "@/lib/constants";
import { formatarData, horaDe, partesData } from "@/lib/datas";
import { ICONES_ESPECIALIDADE } from "@/components/especialidade-icone";
import { CancelarConsulta } from "@/components/cancelar-consulta";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Minhas consultas" };

export default function MinhasConsultasPage() {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Suspense fallback={<h1 className="text-2xl font-semibold tracking-tight">Minhas consultas</h1>}>
            <Saudacao />
          </Suspense>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe seus agendamentos e o histórico de atendimentos.
          </p>
        </div>
        <Button asChild>
          <Link href="/paciente/agendar">
            <CalendarPlus /> Agendar consulta
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ListaSkeleton />}>
        <ListaConsultas />
      </Suspense>
    </>
  );
}

async function Saudacao() {
  const usuario = await getUsuarioAtual();
  const primeiroNome = usuario?.nome.split(" ")[0];
  return (
    <h1 className="text-2xl font-semibold tracking-tight">
      {primeiroNome ? `Olá, ${primeiroNome}` : "Minhas consultas"}
    </h1>
  );
}

async function ListaConsultas() {
  const consultas = await listarMinhasConsultas();
  const ehFutura = (c: ConsultaDTO) => c.status === "agendada" && !c.passou;

  const proximas = consultas.filter(ehFutura).reverse(); // a lista vem da mais nova para a mais antiga
  const historico = consultas.filter((c) => !ehFutura(c));

  return (
    <div className="space-y-10">
      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Próximas consultas
        </h2>
        {proximas.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {proximas.map((c) => (
              <CartaoConsulta key={c.id} consulta={c} />
            ))}
          </div>
        ) : (
          <Empty className="border bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarPlus />
              </EmptyMedia>
              <EmptyTitle>Nenhuma consulta marcada</EmptyTitle>
              <EmptyDescription>
                Escolha uma clínica, conte o que está sentindo e reserve um horário.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild>
                <Link href="/paciente/agendar">Agendar agora</Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </section>

      {historico.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Histórico</CardTitle>
            </CardHeader>
            <CardContent className="divide-y px-0">
              {historico.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3 text-sm">
                  <span className="font-medium whitespace-nowrap tabular-nums sm:w-52">
                    {formatarData(c.data)} · {horaDe(new Date(c.data))}
                  </span>
                  <span className="min-w-40 flex-1 text-muted-foreground">
                    {nomeEspecialidade(c.especialidade)} — {c.clinica.nome}
                  </span>
                  <StatusBadge status={c.status} passou={c.passou} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}

function CartaoConsulta({ consulta: c }: { consulta: ConsultaDTO }) {
  const data = new Date(c.data);
  const partes = partesData(data);
  const Icone = ICONES_ESPECIALIDADE[c.especialidade];
  return (
    <Card className="gap-0 py-0">
      <div className="flex gap-4 p-5">
        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-accent py-2.5 text-accent-foreground">
          <span className="text-[0.7rem] font-semibold uppercase">{partes.semana}</span>
          <span className="text-2xl leading-tight font-semibold">{partes.dia}</span>
          <span className="text-[0.7rem] uppercase">{partes.mes}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Icone className="size-4" /> {nomeEspecialidade(c.especialidade)}
          </div>
          <p className="mt-1 truncate font-semibold">{c.clinica.nome}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> {horaDe(data)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" /> {c.clinica.bairro}, {c.clinica.cidade}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-5 py-3">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {c.sintomas.length ? (
            c.sintomas.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">Sem sintomas informados</span>
          )}
        </div>
        <CancelarConsulta
          id={c.id}
          compacto
          descricao={`${nomeEspecialidade(c.especialidade)} em ${formatarData(data)} às ${horaDe(data)}, na ${c.clinica.nome}`}
        />
      </div>
    </Card>
  );
}

function ListaSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-40" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    </div>
  );
}
