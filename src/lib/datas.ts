// Todas as datas são gravadas em UTC e exibidas no horário de Brasília.
// O Brasil não tem horário de verão desde 2019, então o offset -03:00 é fixo.
export const FUSO = "America/Sao_Paulo";
const OFFSET = "-03:00";

const fmtDia = new Intl.DateTimeFormat("en-CA", {
  timeZone: FUSO,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const fmtHora = new Intl.DateTimeFormat("pt-BR", {
  timeZone: FUSO,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** "2026-11-02" + "09:00" (horário de Brasília) -> Date */
export function combinarDiaHora(dia: string, hora: string) {
  return new Date(`${dia}T${hora}:00${OFFSET}`);
}

/** Date -> "2026-11-02" no horário de Brasília */
export function chaveDia(data: Date) {
  return fmtDia.format(data);
}

/** Date -> "09:00" no horário de Brasília */
export function horaDe(data: Date) {
  return fmtHora.format(data);
}

/** Intervalo [início, fim) de um dia de Brasília, em UTC */
export function limitesDoDia(dia: string) {
  const inicio = new Date(`${dia}T00:00:00${OFFSET}`);
  return { inicio, fim: new Date(inicio.getTime() + 24 * 60 * 60 * 1000) };
}

/** 0 = domingo ... 6 = sábado, para um dia "yyyy-MM-dd" */
export function diaDaSemana(dia: string) {
  return new Date(`${dia}T12:00:00${OFFSET}`).getUTCDay();
}

export function somarDias(dia: string, dias: number) {
  return chaveDia(new Date(new Date(`${dia}T12:00:00${OFFSET}`).getTime() + dias * 86_400_000));
}

export function formatarData(data: Date | string, opcoes: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: FUSO,
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...opcoes,
  }).format(new Date(data));
}

export function formatarDataHora(data: Date | string) {
  return formatarData(data, { hour: "2-digit", minute: "2-digit" });
}
