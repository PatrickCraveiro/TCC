import "server-only";
import { isValidObjectId, type QueryFilter } from "mongoose";
import { connectDB } from "@/lib/db";
import { exigirAdmin } from "@/lib/auth/dal";
import { Funcionario, type FuncionarioDoc } from "@/lib/models/funcionario";
import "@/lib/models/clinica";
import { CARGOS, type Cargo } from "@/lib/constants";
import { chaveDia } from "@/lib/datas";
import { escaparRegex, somenteDigitos } from "@/lib/format";

export type FuncionarioDTO = {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  cargo: Cargo;
  clinicaId: string;
  clinicaNome: string;
  dataContratacao: string; // yyyy-MM-dd
};

type FuncionarioPopulado = Omit<FuncionarioDoc, "clinica"> & {
  _id: unknown;
  clinica: { _id: unknown; nome: string } | null;
};

export type FiltroFuncionarios = { busca?: string; clinicaId?: string; cargo?: string };

export async function listarFuncionarios(filtro: FiltroFuncionarios = {}): Promise<FuncionarioDTO[]> {
  await exigirAdmin();
  await connectDB();

  const query: QueryFilter<FuncionarioDoc> = {};
  const termo = filtro.busca?.trim();
  if (termo) {
    const regex = new RegExp(escaparRegex(termo), "i");
    const or: QueryFilter<FuncionarioDoc>[] = [{ nome: regex }, { email: regex }];
    const cpf = somenteDigitos(termo);
    if (cpf.length >= 3) or.push({ cpf: new RegExp(`^${cpf}`) });
    query.$or = or;
  }
  if (filtro.clinicaId && isValidObjectId(filtro.clinicaId)) query.clinica = filtro.clinicaId;
  if (filtro.cargo && (CARGOS as readonly string[]).includes(filtro.cargo)) {
    query.cargo = filtro.cargo as Cargo;
  }

  const funcionarios = await Funcionario.find(query)
    .populate("clinica", "nome")
    .sort({ nome: 1 })
    .lean<FuncionarioPopulado[]>();

  return funcionarios.map((f) => ({
    id: String(f._id),
    nome: f.nome,
    cpf: f.cpf,
    email: f.email,
    cargo: f.cargo,
    clinicaId: f.clinica ? String(f.clinica._id) : "",
    clinicaNome: f.clinica?.nome ?? "—",
    dataContratacao: chaveDia(f.dataContratacao),
  }));
}
