"use server";

import { refresh } from "next/cache";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { exigirAdmin, exigirUsuario } from "@/lib/auth/dal";
import { Clinica } from "@/lib/models/clinica";
import { Consulta } from "@/lib/models/consulta";
import { agendamentoSchema, type AgendamentoInput } from "@/lib/schemas";
import { combinarDiaHora } from "@/lib/datas";
import { diaAgendavel, horarioPassou } from "@/lib/agenda";
import { erroDuplicado, errosDeValidacao, type EstadoForm } from "@/lib/form-state";

export async function agendarConsulta(input: AgendamentoInput): Promise<EstadoForm> {
  const usuario = await exigirUsuario();

  const dados = agendamentoSchema.safeParse(input);
  if (!dados.success) return errosDeValidacao(dados.error);
  const { clinicaId, especialidade, sintomas, observacoes, dia, hora } = dados.data;

  const agora = new Date();
  if (!diaAgendavel(dia, agora) || horarioPassou(dia, hora, agora)) {
    return { ok: false, mensagem: "Esse horário não está disponível para agendamento." };
  }

  await connectDB();
  if (!(await Clinica.exists({ _id: clinicaId }))) {
    return { ok: false, mensagem: "Clínica não encontrada." };
  }

  const data = combinarDiaHora(dia, hora);
  const conflitoPaciente = await Consulta.exists({ paciente: usuario.id, data, status: "agendada" });
  if (conflitoPaciente) {
    return { ok: false, mensagem: "Você já tem uma consulta agendada nesse horário." };
  }

  try {
    await Consulta.create({
      paciente: usuario.id,
      clinica: clinicaId,
      especialidade,
      sintomas,
      observacoes,
      data,
    });
  } catch (error) {
    // O índice único parcial (clinica + data) resolve a corrida entre dois pacientes.
    if (erroDuplicado(error)) {
      return { ok: false, mensagem: "Esse horário acabou de ser reservado. Escolha outro." };
    }
    throw error;
  }

  return { ok: true, mensagem: "Consulta agendada!" };
}

export async function cancelarConsulta(id: string): Promise<EstadoForm> {
  const usuario = await exigirUsuario();
  if (!isValidObjectId(id)) return { ok: false, mensagem: "Consulta inválida." };

  await connectDB();
  // Paciente só cancela as próprias consultas; admin cancela qualquer uma.
  const filtro = usuario.role === "admin" ? { _id: id } : { _id: id, paciente: usuario.id };
  const consulta = await Consulta.findOneAndUpdate(
    { ...filtro, status: "agendada" },
    { status: "cancelada" },
  );
  if (!consulta) return { ok: false, mensagem: "Consulta não encontrada ou já finalizada." };

  refresh();
  return { ok: true, mensagem: "Consulta cancelada." };
}

export async function marcarComoRealizada(id: string): Promise<EstadoForm> {
  await exigirAdmin();
  if (!isValidObjectId(id)) return { ok: false, mensagem: "Consulta inválida." };

  await connectDB();
  const consulta = await Consulta.findOneAndUpdate(
    { _id: id, status: "agendada" },
    { status: "realizada" },
  );
  if (!consulta) return { ok: false, mensagem: "Consulta não encontrada ou já finalizada." };

  refresh();
  return { ok: true, mensagem: "Consulta marcada como realizada." };
}
