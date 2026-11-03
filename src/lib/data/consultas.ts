import "server-only";
import { isValidObjectId, type QueryFilter } from "mongoose";
import { connectDB } from "@/lib/db";
import { exigirAdmin, exigirUsuario } from "@/lib/auth/dal";
import { Consulta, type ConsultaDoc } from "@/lib/models/consulta";
import { Clinica } from "@/lib/models/clinica";
import { Funcionario } from "@/lib/models/funcionario";
import { Usuario } from "@/lib/models/usuario";
import {
  ESPECIALIDADES,
  HORARIOS,
  STATUS_CONSULTA,
  type EspecialidadeId,
  type Horario,
  type StatusConsulta,
} from "@/lib/constants";
import { horaDe, limitesDoDia } from "@/lib/datas";
import { diaAgendavel, horarioPassou } from "@/lib/agenda";

export type ConsultaDTO = {
  id: string;
  data: string; // ISO
  /** A data já ficou para trás (calculado no servidor). */
  passou: boolean;
  status: StatusConsulta;
  especialidade: EspecialidadeId;
  sintomas: string[];
  observacoes: string;
  clinica: { id: string; nome: string; bairro: string; cidade: string };
  paciente: { id: string; nome: string; email: string };
};

type ConsultaPopulada = Omit<ConsultaDoc, "clinica" | "paciente"> & {
  _id: unknown;
  clinica: { _id: unknown; nome: string; bairro: string; cidade: string } | null;
  paciente: { _id: unknown; nome: string; email: string } | null;
};

function paraDTO(c: ConsultaPopulada, agora: Date): ConsultaDTO {
  return {
    id: String(c._id),
    data: c.data.toISOString(),
    passou: c.data.getTime() < agora.getTime(),
    status: c.status,
    especialidade: c.especialidade,
    sintomas: c.sintomas,
    observacoes: c.observacoes ?? "",
    clinica: c.clinica
      ? { id: String(c.clinica._id), nome: c.clinica.nome, bairro: c.clinica.bairro, cidade: c.clinica.cidade }
      : { id: "", nome: "Clínica removida", bairro: "", cidade: "" },
    paciente: c.paciente
      ? { id: String(c.paciente._id), nome: c.paciente.nome, email: c.paciente.email }
      : { id: "", nome: "Paciente removido", email: "" },
  };
}

function buscarPopulado(query: QueryFilter<ConsultaDoc>) {
  return Consulta.find(query)
    .populate("clinica", "nome bairro cidade")
    .populate("paciente", "nome email");
}

export async function listarMinhasConsultas(): Promise<ConsultaDTO[]> {
  const usuario = await exigirUsuario();
  await connectDB();
  const consultas = await buscarPopulado({ paciente: usuario.id })
    .sort({ data: -1 })
    .lean<ConsultaPopulada[]>();
  const agora = new Date();
  return consultas.map((c) => paraDTO(c, agora));
}

export type FiltroConsultas = { status?: string; clinicaId?: string };

export async function listarConsultas(filtro: FiltroConsultas = {}): Promise<ConsultaDTO[]> {
  await exigirAdmin();
  await connectDB();

  const query: QueryFilter<ConsultaDoc> = {};
  if (filtro.status && (STATUS_CONSULTA as readonly string[]).includes(filtro.status)) {
    query.status = filtro.status as StatusConsulta;
  }
  if (filtro.clinicaId && isValidObjectId(filtro.clinicaId)) query.clinica = filtro.clinicaId;

  const consultas = await buscarPopulado(query)
    .sort({ data: -1 })
    .limit(500)
    .lean<ConsultaPopulada[]>();
  const agora = new Date();
  const dtos = consultas.map((c) => paraDTO(c, agora));
  // Agenda: próximas primeiro (da mais perto para a mais longe), depois o histórico.
  const futuras = dtos.filter((c) => !c.passou).reverse();
  return [...futuras, ...dtos.filter((c) => c.passou)];
}

export type HorarioDTO = { hora: Horario; disponivel: boolean };

/** Grade de horários de um dia para uma clínica. Quem chama deve autenticar. */
export async function horariosDoDia(clinicaId: string, dia: string): Promise<HorarioDTO[]> {
  const agora = new Date();
  if (!isValidObjectId(clinicaId) || !diaAgendavel(dia, agora)) {
    return HORARIOS.map((hora) => ({ hora, disponivel: false }));
  }

  await connectDB();
  if (!(await Clinica.exists({ _id: clinicaId }))) {
    return HORARIOS.map((hora) => ({ hora, disponivel: false }));
  }
  const { inicio, fim } = limitesDoDia(dia);
  const ocupadas = await Consulta.find({
    clinica: clinicaId,
    status: "agendada",
    data: { $gte: inicio, $lt: fim },
  })
    .select("data")
    .lean();
  const ocupados = new Set(ocupadas.map((c) => horaDe(c.data)));

  return HORARIOS.map((hora) => ({
    hora,
    disponivel: !ocupados.has(hora) && !horarioPassou(dia, hora, agora),
  }));
}

export async function resumoAdmin() {
  await exigirAdmin();
  await connectDB();
  const agora = new Date();

  const [clinicas, funcionarios, pacientes, agendadas, porClinica, porEspecialidade, proximas] =
    await Promise.all([
      Clinica.countDocuments(),
      Funcionario.countDocuments(),
      Usuario.countDocuments({ role: "paciente" }),
      Consulta.countDocuments({ status: "agendada", data: { $gte: agora } }),
      Consulta.aggregate<{ _id: unknown; total: number }>([
        { $match: { status: { $ne: "cancelada" } } },
        { $group: { _id: "$clinica", total: { $sum: 1 } } },
      ]),
      Consulta.aggregate<{ _id: EspecialidadeId; total: number }>([
        { $match: { status: { $ne: "cancelada" } } },
        { $group: { _id: "$especialidade", total: { $sum: 1 } } },
      ]),
      buscarPopulado({ status: "agendada", data: { $gte: agora } })
        .sort({ data: 1 })
        .limit(6)
        .lean<ConsultaPopulada[]>(),
    ]);

  const nomes = new Map(
    (await Clinica.find().select("nome").lean()).map((c) => [String(c._id), c.nome]),
  );
  const totaisEspecialidade = new Map(porEspecialidade.map((e) => [e._id, e.total]));

  return {
    totais: { clinicas, funcionarios, pacientes, agendadas },
    porClinica: porClinica
      .map((c) => ({ clinica: nomes.get(String(c._id)) ?? "Removida", total: c.total }))
      .sort((a, b) => b.total - a.total),
    porEspecialidade: ESPECIALIDADES.map((e) => ({
      especialidade: e.nome,
      total: totaisEspecialidade.get(e.id) ?? 0,
    })).sort((a, b) => b.total - a.total),
    proximas: proximas.map((c) => paraDTO(c, agora)),
  };
}
