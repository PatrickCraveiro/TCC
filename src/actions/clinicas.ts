"use server";

import { refresh } from "next/cache";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { exigirAdmin } from "@/lib/auth/dal";
import { Clinica } from "@/lib/models/clinica";
import { Funcionario } from "@/lib/models/funcionario";
import { Consulta } from "@/lib/models/consulta";
import { clinicaSchema } from "@/lib/schemas";
import { erroDuplicado, errosDeValidacao, type EstadoForm } from "@/lib/form-state";

export async function salvarClinica(_estado: EstadoForm, formData: FormData): Promise<EstadoForm> {
  await exigirAdmin();

  const id = formData.get("id");
  const dados = clinicaSchema.safeParse(Object.fromEntries(formData));
  if (!dados.success) return errosDeValidacao(dados.error);

  await connectDB();
  try {
    if (typeof id === "string" && id) {
      if (!isValidObjectId(id)) return { ok: false, mensagem: "Clínica inválida." };
      const atualizada = await Clinica.findByIdAndUpdate(id, dados.data, { runValidators: true });
      if (!atualizada) return { ok: false, mensagem: "Clínica não encontrada." };
    } else {
      await Clinica.create(dados.data);
    }
  } catch (error) {
    if (erroDuplicado(error)) {
      return { ok: false, erros: { cnpj: ["Já existe uma clínica com este CNPJ."] } };
    }
    throw error;
  }

  refresh();
  return { ok: true, mensagem: id ? "Clínica atualizada." : "Clínica cadastrada." };
}

export async function excluirClinica(id: string): Promise<EstadoForm> {
  await exigirAdmin();
  if (!isValidObjectId(id)) return { ok: false, mensagem: "Clínica inválida." };

  await connectDB();
  const [funcionarios, consultas] = await Promise.all([
    Funcionario.countDocuments({ clinica: id }),
    Consulta.countDocuments({ clinica: id }),
  ]);
  if (funcionarios || consultas) {
    return {
      ok: false,
      mensagem: `Não é possível excluir: a clínica tem ${funcionarios} funcionário(s) e ${consultas} consulta(s) vinculados.`,
    };
  }

  await Clinica.findByIdAndDelete(id);
  refresh();
  return { ok: true, mensagem: "Clínica excluída." };
}
