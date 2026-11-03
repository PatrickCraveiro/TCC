import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CalendarClock,
  ChartColumn,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Stethoscope,
  Users,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PASSOS = [
  {
    icone: Building2,
    titulo: "Escolha a clínica",
    texto: "Veja as clínicas parceiras da sua região e escolha a mais perto de você.",
  },
  {
    icone: ClipboardList,
    titulo: "Faça a pré-triagem",
    texto: "Conte a especialidade e os sintomas. O médico já recebe tudo antes de te atender.",
  },
  {
    icone: CalendarClock,
    titulo: "Marque dia e horário",
    texto: "Só aparecem horários realmente livres. Nada de ligar para confirmar.",
  },
  {
    icone: CheckCircle2,
    titulo: "É só comparecer",
    texto: "Acompanhe e cancele suas consultas quando quiser, direto pelo painel.",
  },
];

const RECURSOS_CLINICA = [
  { icone: Building2, texto: "Cadastro de clínicas e unidades" },
  { icone: Users, texto: "Gestão de funcionários por cargo" },
  { icone: CalendarCheck2, texto: "Agenda unificada de consultas" },
  { icone: ChartColumn, texto: "Relatórios por clínica e especialidade" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/cadastro">Criar conta</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_80%_-10%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-6 gap-1.5 px-2.5 py-1">
                <Stethoscope /> Agendamento online de consultas
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Sua consulta médica marcada em{" "}
                <span className="text-primary">poucos cliques</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
                Com o MEDQUERY você agenda consultas em clínicas da sua região e faz a
                pré-triagem online. O atendimento fica mais rápido, sem fila de espera e
                direto com o médico.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" className="h-11 px-5 text-[0.95rem]" asChild>
                  <Link href="/cadastro">
                    Agendar minha consulta <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-11 px-5 text-[0.95rem]" asChild>
                  <Link href="/login">Já tenho conta</Link>
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Pré-triagem online", "Horários em tempo real", "Cancelamento grátis"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <PreviaConsulta />
          </div>
        </section>

        <section className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">Como funciona</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Do sintoma ao horário marcado em quatro passos
              </h2>
            </div>
            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PASSOS.map(({ icone: Icone, titulo, texto }, i) => (
                <li key={titulo} className="rounded-2xl border bg-card p-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Icone className="size-5" />
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-semibold">{titulo}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,oklch(0.42_0.08_200),oklch(0.52_0.1_190))] p-10 text-white lg:grid-cols-2 lg:p-14">
            <div>
              <p className="text-sm font-semibold tracking-wide text-white/70 uppercase">Para clínicas</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
                Um painel para cuidar de toda a operação
              </h2>
              <p className="mt-4 text-white/80">
                Administradores gerenciam clínicas, equipe e agenda no mesmo lugar, com
                indicadores atualizados a cada agendamento.
              </p>
              <Button size="lg" variant="secondary" className="mt-8 h-11 px-5" asChild>
                <Link href="/login">
                  Acessar painel <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {RECURSOS_CLINICA.map(({ icone: Icone, texto }) => (
                <li key={texto} className="flex items-center gap-3 rounded-xl bg-white/10 p-4 ring-1 ring-white/15">
                  <Icone className="size-5 shrink-0 text-white/90" />
                  <span className="text-sm font-medium">{texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>Trabalho de Conclusão de Curso · Patrick Craveiro</p>
        </div>
      </footer>
    </div>
  );
}

/** Ilustração do produto montada com a própria UI, sem imagens. */
function PreviaConsulta() {
  const dias = ["S", "T", "Q", "Q", "S"];
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md select-none">
      <div className="absolute -top-6 -right-4 w-56 rotate-3 rounded-2xl border bg-card p-4 shadow-lg">
        <p className="text-xs font-medium text-muted-foreground">Novembro</p>
        <div className="mt-3 grid grid-cols-5 gap-1.5 text-center text-[0.7rem]">
          {dias.map((d, i) => (
            <span key={i} className="text-muted-foreground">{d}</span>
          ))}
          {Array.from({ length: 15 }, (_, i) => {
            const dia = 2 + Math.floor(i / 5) * 7 + (i % 5); // só dias úteis
            return (
              <span
                key={i}
                className={
                  dia === 10
                    ? "rounded-md bg-primary py-1 font-semibold text-primary-foreground"
                    : "rounded-md bg-muted py-1"
                }
              >
                {dia}
              </span>
            );
          })}
        </div>
      </div>

      <div className="relative mt-24 rounded-2xl border bg-card p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Próxima consulta</p>
            <p className="mt-1 text-lg font-semibold">Clínica Santo Paulo</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> Vila Mariana, São Paulo
            </p>
          </div>
          <div className="rounded-xl bg-accent px-3 py-2 text-center text-accent-foreground">
            <p className="text-[0.65rem] font-semibold uppercase">Ter</p>
            <p className="text-xl leading-none font-semibold">10</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge className="bg-primary/10 text-primary">Clínica geral</Badge>
          <Badge variant="outline">Febre</Badge>
          <Badge variant="outline">Dor no corpo</Badge>
        </div>
        <div className="mt-6 grid grid-cols-5 gap-2">
          {["08:00", "09:00", "10:00", "11:00", "13:00"].map((h) => (
            <span
              key={h}
              className={
                h === "09:00"
                  ? "rounded-lg bg-primary py-2 text-center text-xs font-semibold text-primary-foreground"
                  : h === "10:00"
                    ? "rounded-lg border border-dashed py-2 text-center text-xs text-muted-foreground line-through"
                    : "rounded-lg border py-2 text-center text-xs"
              }
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
