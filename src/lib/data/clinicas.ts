import "server-only";
import type { QueryFilter } from "mongoose";
import { connectDB } from "@/lib/db";
import { exigirAdmin, exigirUsuario } from "@/lib/auth/dal";
import { Clinica, type ClinicaDoc } from "@/lib/models/clinica";
import { Funcionario } from "@/lib/models/funcionario";
import { Consulta } from "@/lib/models/consulta";
import { escaparRegex, normalizarCNPJ } from "@/lib/format";

export type ClinicaDTO = {
  id: string;
  nome: string;
  cnpj: string;
  cidade: string;
  bairro: string;
  cep: string;
};

export type ClinicaComTotaisDTO = ClinicaDTO & {
  totalFuncionarios: number;
  consultasAgendadas: number;
};

type ClinicaLean = ClinicaDoc & { _id: unknown };

function paraDTO(c: ClinicaLean): ClinicaDTO {
  return {
    id: String(c._id),
    nome: c.nome,
    cnpj: c.cnpj,
    cidade: c.cidade,
    bairro: c.bairro,
    cep: c.cep,
  };
}

function filtroBusca(busca: string): QueryFilter<ClinicaDoc> {
  const termo = busca.trim();
  if (!termo) return {};
  const regex = new RegExp(escaparRegex(termo), "i");
  const or: QueryFilter<ClinicaDoc>[] = [{ nome: regex }, { cidade: regex }, { bairro: regex }];
  const cnpj = normalizarCNPJ(termo);
  if (cnpj.length >= 2) or.push({ cnpj: new RegExp(`^${escaparRegex(cnpj)}`) });
  return { $or: or };
}

/** Lista simples, usada no agendamento (qualquer usuário logado). */
export async function listarClinicas(): Promise<ClinicaDTO[]> {
  await exigirUsuario();
  await connectDB();
  const clinicas = await Clinica.find().sort({ nome: 1 }).lean<ClinicaLean[]>();
  return clinicas.map(paraDTO);
}

/** Lista do painel admin, com totais de funcionários e consultas futuras. */
export async function listarClinicasAdmin(busca = ""): Promise<ClinicaComTotaisDTO[]> {
  await exigirAdmin();
  await connectDB();

  const [clinicas, funcionarios, consultas] = await Promise.all([
    Clinica.find(filtroBusca(busca)).sort({ nome: 1 }).lean<ClinicaLean[]>(),
    Funcionario.aggregate<{ _id: unknown; total: number }>([
      { $group: { _id: "$clinica", total: { $sum: 1 } } },
    ]),
    Consulta.aggregate<{ _id: unknown; total: number }>([
      { $match: { status: "agendada", data: { $gte: new Date() } } },
      { $group: { _id: "$clinica", total: { $sum: 1 } } },
    ]),
  ]);

  const totalPor = (lista: { _id: unknown; total: number }[]) =>
    new Map(lista.map((i) => [String(i._id), i.total]));
  const funcPorClinica = totalPor(funcionarios);
  const consPorClinica = totalPor(consultas);

  return clinicas.map((c) => ({
    ...paraDTO(c),
    totalFuncionarios: funcPorClinica.get(String(c._id)) ?? 0,
    consultasAgendadas: consPorClinica.get(String(c._id)) ?? 0,
  }));
}

/** Opções de select (id + nome) para os filtros e formulários do admin. */
export async function opcoesClinicas() {
  await exigirAdmin();
  await connectDB();
  const clinicas = await Clinica.find().select("nome").sort({ nome: 1 }).lean<ClinicaLean[]>();
  return clinicas.map((c) => ({ id: String(c._id), nome: c.nome }));
}
