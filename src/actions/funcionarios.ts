"use server";

import { refresh } from "next/cache";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { exigirAdmin } from "@/lib/auth/dal";
import { Clinica } from "@/lib/models/clinica";
import { Funcionario } from "@/lib/models/funcionario";
import { funcionarioSchema } from "@/lib/schemas";
import { combinarDiaHora } from "@/lib/datas";
import { erroDuplicado, errosDeValidacao, type EstadoForm } from "@/lib/form-state";

export async function salvarFuncionario(
  _estado: EstadoForm,
  formData: FormData,
): Promise<EstadoForm> {
  await exigirAdmin();

  const id = formData.get("id");
  const dados = funcionarioSchema.safeParse(Object.fromEntries(formData));
  if (!dados.success) return errosDeValidacao(dados.error);

  await connectDB();
  const { clinicaId, dataContratacao, ...resto } = dados.data;
  if (!(await Clinica.exists({ _id: clinicaId }))) {
    return { ok: false, erros: { clinicaId: ["Clínica não encontrada."] } };
  }

  const documento = {
    ...resto,
    clinica: clinicaId,
    // Meio-dia evita que a data "volte" um dia ao converter fusos.
    dataContratacao: combinarDiaHora(dataContratacao, "12:00"),
  };

  try {
    if (typeof id === "string" && id) {
      if (!isValidObjectId(id)) return { ok: false, mensagem: "Funcionário inválido." };
      const atualizado = await Funcionario.findByIdAndUpdate(id, documento, { runValidators: true });
      if (!atualizado) return { ok: false, mensagem: "Funcionário não encontrado." };
    } else {
      await Funcionario.create(documento);
    }
  } catch (error) {
    if (erroDuplicado(error)) {
      return { ok: false, erros: { cpf: ["Já existe um funcionário com este CPF."] } };
    }
    throw error;
  }

  refresh();
  return { ok: true, mensagem: id ? "Funcionário atualizado." : "Funcionário cadastrado." };
}

export async function excluirFuncionario(id: string): Promise<EstadoForm> {
  await exigirAdmin();
  if (!isValidObjectId(id)) return { ok: false, mensagem: "Funcionário inválido." };

  await connectDB();
  await Funcionario.findByIdAndDelete(id);
  refresh();
  return { ok: true, mensagem: "Funcionário excluído." };
}
