"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useTransition } from "react";
import { format } from "date-fns";
import { ptBR } from "react-day-picker/locale";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck2,
  Check,
  Loader2,
  MapPin,
  Search,
  Sun,
  Sunset,
} from "lucide-react";
import { agendarConsulta } from "@/actions/consultas";
import {
  ESPECIALIDADES,
  JANELA_AGENDAMENTO_DIAS,
  SINTOMAS,
  nomeEspecialidade,
  type EspecialidadeId,
  type Horario,
} from "@/lib/constants";
import { diaAgendavel } from "@/lib/agenda";
import { chaveDia, combinarDiaHora, formatarData, somarDias } from "@/lib/datas";
import type { ClinicaDTO } from "@/lib/data/clinicas";
import type { HorarioDTO } from "@/lib/data/consultas";
import { ICONES_ESPECIALIDADE } from "@/components/especialidade-icone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Sintoma = (typeof SINTOMAS)[number];

const ETAPAS = ["Clínica", "Triagem", "Data e horário", "Confirmação"] as const;

const dataLonga = (dia: string, hora: string) =>
  formatarData(combinarDiaHora(dia, hora), { weekday: "long", day: "numeric", month: "long" });

export function AgendamentoWizard({ clinicas, agoraISO }: { clinicas: ClinicaDTO[]; agoraISO: string }) {
  const agora = useMemo(() => new Date(agoraISO), [agoraISO]);

  const [etapa, setEtapa] = useState(0);
  const [clinicaId, setClinicaId] = useState<string>();
  const [especialidade, setEspecialidade] = useState<EspecialidadeId>();
  const [sintomas, setSintomas] = useState<Sintoma[]>([]);
  const [observacoes, setObservacoes] = useState("");
  const [dia, setDia] = useState<string>();
  const [hora, setHora] = useState<Horario>();
  const [horarios, setHorarios] = useState<HorarioDTO[] | null>(null);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [enviando, iniciarEnvio] = useTransition();
  const requisicao = useRef<AbortController | null>(null);

  const clinica = clinicas.find((c) => c.id === clinicaId);

  async function carregarHorarios(idClinica: string, novoDia: string) {
    requisicao.current?.abort();
    const controle = new AbortController();
    requisicao.current = controle;
    setCarregandoHorarios(true);
    setHorarios(null);
    try {
      const resposta = await fetch(`/api/horarios?clinica=${idClinica}&dia=${novoDia}`, {
        signal: controle.signal,
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      const corpo: { horarios: HorarioDTO[] } = await resposta.json();
      setHorarios(corpo.horarios);
    } catch {
      if (!controle.signal.aborted) toast.error("Não foi possível carregar os horários.");
    } finally {
      if (!controle.signal.aborted) setCarregandoHorarios(false);
    }
  }

  function escolherClinica(id: string) {
    if (id === clinicaId) return;
    setClinicaId(id);
    setDia(undefined);
    setHora(undefined);
    setHorarios(null);
  }

  function escolherDia(data: Date | undefined) {
    if (!data || !clinicaId) return;
    const novoDia = format(data, "yyyy-MM-dd");
    setDia(novoDia);
    setHora(undefined);
    carregarHorarios(clinicaId, novoDia);
  }

  function alternarSintoma(sintoma: Sintoma) {
    setSintomas((atual) =>
      atual.includes(sintoma) ? atual.filter((s) => s !== sintoma) : [...atual, sintoma],
    );
  }

  function confirmar() {
    if (!clinicaId || !especialidade || !dia || !hora) return;
    iniciarEnvio(async () => {
      const resultado = await agendarConsulta({
        clinicaId,
        especialidade,
        sintomas,
        observacoes: observacoes || undefined,
        dia,
        hora,
      });
      if (resultado?.ok) {
        setConcluido(true);
        return;
      }
      toast.error(resultado?.mensagem ?? "Não foi possível agendar.");
      // O horário pode ter sido ocupado nesse meio-tempo: volta para escolher outro.
      setEtapa(2);
      setHora(undefined);
      carregarHorarios(clinicaId, dia);
    });
  }

  function reiniciar() {
    setEtapa(0);
    setClinicaId(undefined);
    setEspecialidade(undefined);
    setSintomas([]);
    setObservacoes("");
    setDia(undefined);
    setHora(undefined);
    setHorarios(null);
    setConcluido(false);
  }

  if (concluido && clinica && especialidade && dia && hora) {
    return (
      <Card className="items-center py-14 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success/12 text-success">
          <CalendarCheck2 className="size-7" />
        </span>
        <div className="px-6">
          <h2 className="text-xl font-semibold">Consulta agendada!</h2>
          <p className="mt-2 text-muted-foreground">
            {nomeEspecialidade(especialidade)} na {clinica.nome},{" "}
            <span className="font-medium text-foreground">
              {dataLonga(dia, hora)} às {hora}
            </span>
            .
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/paciente">Ver minhas consultas</Link>
          </Button>
          <Button variant="outline" onClick={reiniciar}>
            Agendar outra
          </Button>
        </div>
      </Card>
    );
  }

  const podeAvancar = [!!clinicaId, !!especialidade, !!dia && !!hora, true][etapa];

  return (
    <div className="space-y-6">
      <ol className="grid grid-cols-4 gap-2">
        {ETAPAS.map((nome, i) => (
          <li key={nome} className="flex flex-col gap-2">
            <span className={cn("h-1.5 rounded-full bg-border transition-colors", i <= etapa && "bg-primary")} />
            <span
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm",
                i === etapa && "text-foreground",
              )}
            >
              {i < etapa ? <Check className="size-3.5 text-primary" /> : <span className="tabular-nums">{i + 1}.</span>}
              <span className={cn(i !== etapa && "hidden sm:inline")}>{nome}</span>
            </span>
          </li>
        ))}
      </ol>

      <Card className="gap-0 py-0">
        <CardContent className="p-5 sm:p-7">
          {etapa === 0 && (
            <EtapaClinica clinicas={clinicas} selecionada={clinicaId} aoEscolher={escolherClinica} />
          )}

          {etapa === 1 && (
            <div className="space-y-8">
              <section>
                <Titulo>Qual especialidade você procura?</Titulo>
                <div role="radiogroup" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {ESPECIALIDADES.map((e) => {
                    const Icone = ICONES_ESPECIALIDADE[e.id];
                    return (
                      <Opcao key={e.id} ativa={especialidade === e.id} onClick={() => setEspecialidade(e.id)}>
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                          <Icone className="size-4.5" />
                        </span>
                        <span>
                          <span className="block font-medium">{e.nome}</span>
                          <span className="block text-xs text-muted-foreground">{e.descricao}</span>
                        </span>
                      </Opcao>
                    );
                  })}
                </div>
              </section>

              <section>
                <Titulo descricao="Opcional. Ajuda o médico a se preparar para o atendimento.">
                  O que você está sentindo?
                </Titulo>
                <div className="flex flex-wrap gap-2">
                  {SINTOMAS.map((s) => {
                    const ativo = sintomas.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() => alternarSintoma(s)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors hover:bg-muted",
                          ativo && "border-primary bg-primary/8 text-primary hover:bg-primary/12",
                        )}
                      >
                        {ativo && <Check className="size-3.5" />} {s}
                      </button>
                    );
                  })}
                </div>
                <Textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  maxLength={500}
                  placeholder="Quer contar mais alguma coisa? Há quanto tempo sente, medicamentos em uso..."
                  className="mt-4 min-h-24"
                />
                <p className="mt-1 text-right text-xs text-muted-foreground tabular-nums">
                  {observacoes.length}/500
                </p>
              </section>
            </div>
          )}

          {etapa === 2 && (
            <div className="grid gap-8 md:grid-cols-[auto_1fr]">
              <section>
                <Titulo descricao="Atendimento de segunda a sexta.">Escolha o dia</Titulo>
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={dia ? new Date(`${dia}T12:00:00`) : undefined}
                  onSelect={escolherDia}
                  defaultMonth={dia ? new Date(`${dia}T12:00:00`) : agora}
                  startMonth={agora}
                  endMonth={combinarDiaHora(somarDias(chaveDia(agora), JANELA_AGENDAMENTO_DIAS), "12:00")}
                  disabled={(d) => !diaAgendavel(format(d, "yyyy-MM-dd"), agora)}
                  className="rounded-xl border p-3 [--cell-size:--spacing(9)]"
                />
              </section>
              <section>
                <Titulo descricao={dia ? dataLonga(dia, "12:00") : "Selecione um dia no calendário."}>
                  Escolha o horário
                </Titulo>
                <GradeHorarios
                  dia={dia}
                  horarios={horarios}
                  carregando={carregandoHorarios}
                  selecionado={hora}
                  aoEscolher={setHora}
                />
              </section>
            </div>
          )}

          {etapa === 3 && clinica && especialidade && dia && hora && (
            <section>
              <Titulo descricao="Confira os dados antes de confirmar.">Resumo do agendamento</Titulo>
              <dl className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
                <Resumo rotulo="Clínica">
                  {clinica.nome}
                  <span className="block text-sm font-normal text-muted-foreground">
                    {clinica.bairro}, {clinica.cidade}
                  </span>
                </Resumo>
                <Resumo rotulo="Data e horário">
                  <span className="first-letter:uppercase">{dataLonga(dia, hora)}</span>
                  <span className="block text-sm font-normal text-muted-foreground">às {hora}</span>
                </Resumo>
                <Resumo rotulo="Especialidade">{nomeEspecialidade(especialidade)}</Resumo>
                <Resumo rotulo="Sintomas">
                  {sintomas.length ? (
                    <span className="flex flex-wrap gap-1.5">
                      {sintomas.map((s) => (
                        <Badge key={s} variant="outline">
                          {s}
                        </Badge>
                      ))}
                    </span>
                  ) : (
                    <span className="font-normal text-muted-foreground">Não informados</span>
                  )}
                </Resumo>
                {observacoes && (
                  <Resumo rotulo="Observações" className="sm:col-span-2">
                    <span className="font-normal whitespace-pre-line">{observacoes}</span>
                  </Resumo>
                )}
              </dl>
            </section>
          )}
        </CardContent>

        <CardFooter className="justify-between gap-3 border-t px-5 py-4 sm:px-7">
          <Button variant="ghost" onClick={() => setEtapa((e) => e - 1)} disabled={etapa === 0 || enviando}>
            <ArrowLeft data-icon="inline-start" /> Voltar
          </Button>
          {etapa < 3 ? (
            <Button onClick={() => setEtapa((e) => e + 1)} disabled={!podeAvancar}>
              Continuar <ArrowRight data-icon="inline-end" />
            </Button>
          ) : (
            <Button onClick={confirmar} disabled={enviando}>
              {enviando ? <Loader2 className="animate-spin" /> : <Check />}
              Confirmar agendamento
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function EtapaClinica({
  clinicas,
  selecionada,
  aoEscolher,
}: {
  clinicas: ClinicaDTO[];
  selecionada?: string;
  aoEscolher: (id: string) => void;
}) {
  const [busca, setBusca] = useState("");
  const termo = busca.trim().toLowerCase();
  const filtradas = termo
    ? clinicas.filter((c) => `${c.nome} ${c.bairro} ${c.cidade}`.toLowerCase().includes(termo))
    : clinicas;

  return (
    <section>
      <Titulo>Onde você quer ser atendido?</Titulo>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, bairro ou cidade"
          className="h-10 pl-9"
        />
      </div>
      {filtradas.length ? (
        <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
          {filtradas.map((c) => (
            <Opcao key={c.id} ativa={selecionada === c.id} onClick={() => aoEscolher(c.id)}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Building2 className="size-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium">{c.nome}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" /> {c.bairro}, {c.cidade}
                </span>
              </span>
            </Opcao>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-muted-foreground">
          {clinicas.length ? "Nenhuma clínica encontrada para essa busca." : "Ainda não há clínicas cadastradas."}
        </p>
      )}
    </section>
  );
}

function GradeHorarios({
  dia,
  horarios,
  carregando,
  selecionado,
  aoEscolher,
}: {
  dia?: string;
  horarios: HorarioDTO[] | null;
  carregando: boolean;
  selecionado?: string;
  aoEscolher: (hora: Horario) => void;
}) {
  if (!dia) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Os horários livres aparecem aqui.
      </div>
    );
  }
  if (carregando || !horarios) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <Skeleton key={i} className="h-10 rounded-lg" />
        ))}
      </div>
    );
  }
  if (!horarios.some((h) => h.disponivel)) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed px-6 text-center text-sm text-muted-foreground">
        Não há horários livres neste dia. Tente outra data.
      </div>
    );
  }

  const turnos = [
    { nome: "Manhã", icone: Sun, lista: horarios.filter((h) => h.hora < "12:00") },
    { nome: "Tarde", icone: Sunset, lista: horarios.filter((h) => h.hora >= "12:00") },
  ];

  return (
    <div className="space-y-5">
      {turnos.map(({ nome, icone: Icone, lista }) => (
        <div key={nome}>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Icone className="size-3.5" /> {nome}
          </p>
          <div role="radiogroup" className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {lista.map((h) => (
              <button
                key={h.hora}
                type="button"
                role="radio"
                aria-checked={selecionado === h.hora}
                disabled={!h.disponivel}
                onClick={() => aoEscolher(h.hora)}
                className={cn(
                  "h-10 rounded-lg border text-sm font-medium tabular-nums transition-colors hover:border-primary/50 hover:bg-accent",
                  "disabled:pointer-events-none disabled:border-dashed disabled:text-muted-foreground/60 disabled:line-through",
                  selecionado === h.hora && "border-primary bg-primary text-primary-foreground hover:bg-primary",
                )}
              >
                {h.hora}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Titulo({ children, descricao }: { children: React.ReactNode; descricao?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold">{children}</h2>
      {descricao && <p className="mt-0.5 text-sm text-muted-foreground first-letter:uppercase">{descricao}</p>}
    </div>
  );
}

function Opcao({
  ativa,
  onClick,
  children,
}: {
  ativa: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={ativa}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition-colors hover:border-primary/40 hover:bg-accent/40",
        ativa && "border-primary bg-accent/60 ring-1 ring-primary hover:bg-accent/60",
      )}
    >
      {children}
      {ativa && (
        <span className="absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      )}
    </button>
  );
}

function Resumo({
  rotulo,
  children,
  className,
}: {
  rotulo: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-card p-4", className)}>
      <dt className="text-xs font-medium text-muted-foreground uppercase">{rotulo}</dt>
      <dd className="mt-1 font-medium">{children}</dd>
    </div>
  );
}
