import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Building2, CalendarClock, UserRound, Users, type LucideIcon } from "lucide-react";
import { resumoAdmin } from "@/lib/data/consultas";
import { nomeEspecialidade } from "@/lib/constants";
import { horaDe, partesData } from "@/lib/datas";
import { BarrasRanqueadas } from "@/components/barras-ranqueadas";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Visão geral" };

export default function AdminPage() {
  return (
    <>
      <PageHeader titulo="Visão geral" descricao="Indicadores de todas as clínicas, atualizados a cada agendamento." />
      <Suspense fallback={<PainelSkeleton />}>
        <Painel />
      </Suspense>
    </>
  );
}

async function Painel() {
  const { totais, porClinica, porEspecialidade, proximas } = await resumoAdmin();

  const indicadores: { rotulo: string; valor: number; icone: LucideIcon; href?: string }[] = [
    { rotulo: "Consultas agendadas", valor: totais.agendadas, icone: CalendarClock, href: "/admin/consultas?status=agendada" },
    { rotulo: "Pacientes cadastrados", valor: totais.pacientes, icone: UserRound },
    { rotulo: "Clínicas", valor: totais.clinicas, icone: Building2, href: "/admin/clinicas" },
    { rotulo: "Funcionários", valor: totais.funcionarios, icone: Users, href: "/admin/funcionarios" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {indicadores.map(({ rotulo, valor, icone: Icone, href }) => {
          const cartao = (
            <Card className="h-full gap-3 transition-colors group-hover:border-primary/40">
              <CardHeader>
                <CardDescription>{rotulo}</CardDescription>
                <CardAction>
                  <Icone className="size-4 text-muted-foreground" />
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight">{valor.toLocaleString("pt-BR")}</p>
              </CardContent>
            </Card>
          );
          return href ? (
            <Link key={rotulo} href={href} className="group">
              {cartao}
            </Link>
          ) : (
            <div key={rotulo}>{cartao}</div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consultas por clínica</CardTitle>
            <CardDescription>Agendadas e realizadas, sem contar cancelamentos</CardDescription>
          </CardHeader>
          <CardContent>
            {porClinica.length ? (
              <BarrasRanqueadas
                itens={porClinica.map((c) => ({ rotulo: c.clinica, valor: c.total }))}
                unidade={["consulta", "consultas"]}
              />
            ) : (
              <SemDados />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Consultas por especialidade</CardTitle>
            <CardDescription>Demanda informada na pré-triagem</CardDescription>
          </CardHeader>
          <CardContent>
            {porEspecialidade.some((e) => e.total) ? (
              <BarrasRanqueadas
                itens={porEspecialidade.map((e) => ({ rotulo: e.especialidade, valor: e.total }))}
                unidade={["consulta", "consultas"]}
              />
            ) : (
              <SemDados />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximas consultas</CardTitle>
          <CardDescription>Os próximos atendimentos em todas as clínicas</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/consultas?status=agendada">
                Ver agenda <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {proximas.length ? (
            <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {proximas.map((c) => {
                const partes = partesData(c.data);
                return (
                  <li key={c.id} className="flex items-center gap-3 rounded-xl border p-3">
                    <div className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-accent py-1.5 text-accent-foreground">
                      <span className="text-[0.65rem] font-semibold uppercase">{partes.mes}</span>
                      <span className="text-lg leading-tight font-semibold">{partes.dia}</span>
                    </div>
                    <div className="min-w-0 text-sm">
                      <p className="truncate font-medium">{c.paciente.nome}</p>
                      <p className="truncate text-muted-foreground">
                        {horaDe(new Date(c.data))} · {nomeEspecialidade(c.especialidade)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{c.clinica.nome}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <SemDados texto="Nenhuma consulta futura agendada." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SemDados({ texto = "Ainda não há consultas registradas." }: { texto?: string }) {
  return <p className="py-8 text-center text-sm text-muted-foreground">{texto}</p>;
}

function PainelSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
}
