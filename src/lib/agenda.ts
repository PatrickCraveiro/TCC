import { HORARIOS, JANELA_AGENDAMENTO_DIAS } from "@/lib/constants";
import { chaveDia, combinarDiaHora, diaDaSemana, somarDias } from "@/lib/datas";

// Regras puras de agenda, usadas no servidor (validação) e no cliente (calendário).

export function diaAgendavel(dia: string, agora: Date) {
  const hoje = chaveDia(agora);
  const semana = diaDaSemana(dia);
  // Hoje só conta enquanto ainda houver algum horário pela frente.
  const hojeEncerrado = dia === hoje && horarioPassou(dia, HORARIOS[HORARIOS.length - 1], agora);
  return (
    dia >= hoje &&
    !hojeEncerrado &&
    dia <= somarDias(hoje, JANELA_AGENDAMENTO_DIAS) &&
    semana !== 0 &&
    semana !== 6
  );
}

export function horarioPassou(dia: string, hora: string, agora: Date) {
  return combinarDiaHora(dia, hora).getTime() <= agora.getTime();
}
