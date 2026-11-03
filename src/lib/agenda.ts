import { JANELA_AGENDAMENTO_DIAS } from "@/lib/constants";
import { chaveDia, combinarDiaHora, diaDaSemana, somarDias } from "@/lib/datas";

// Regras puras de agenda, usadas no servidor (validação) e no cliente (calendário).

export function diaAgendavel(dia: string, agora: Date) {
  const hoje = chaveDia(agora);
  const semana = diaDaSemana(dia);
  return (
    dia >= hoje &&
    dia <= somarDias(hoje, JANELA_AGENDAMENTO_DIAS) &&
    semana !== 0 &&
    semana !== 6
  );
}

export function horarioPassou(dia: string, hora: string, agora: Date) {
  return combinarDiaHora(dia, hora).getTime() <= agora.getTime();
}
