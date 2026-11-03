"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Usuario } from "@/lib/models/usuario";
import { criarSessao, encerrarSessao } from "@/lib/auth/session";
import { cadastroSchema, loginSchema } from "@/lib/schemas";
import { erroDuplicado, errosDeValidacao, type EstadoForm } from "@/lib/form-state";

// Compara contra um hash real mesmo quando o usuário não existe, para o tempo
// de resposta não revelar quais logins estão cadastrados.
let hashFalso: Promise<string> | undefined;
const obterHashFalso = () => (hashFalso ??= bcrypt.hash("usuario-inexistente", 10));

export async function entrar(_estado: EstadoForm, formData: FormData): Promise<EstadoForm> {
  const dados = loginSchema.safeParse(Object.fromEntries(formData));
  if (!dados.success) return errosDeValidacao(dados.error);

  const identificador = dados.data.identificador.toLowerCase();
  await connectDB();
  const usuario = await Usuario.findOne({
    $or: [{ login: identificador }, { email: identificador }],
  })
    .select("+senhaHash")
    .lean();

  const senhaConfere = await bcrypt.compare(
    dados.data.senha,
    usuario?.senhaHash ?? (await obterHashFalso()),
  );
  if (!usuario || !senhaConfere) {
    return { ok: false, mensagem: "Login ou senha incorretos." };
  }

  await criarSessao({ userId: String(usuario._id), role: usuario.role });
  redirect(usuario.role === "admin" ? "/admin" : "/paciente");
}

export async function cadastrar(_estado: EstadoForm, formData: FormData): Promise<EstadoForm> {
  const dados = cadastroSchema.safeParse(Object.fromEntries(formData));
  if (!dados.success) return errosDeValidacao(dados.error);

  const { nome, login, email, senha } = dados.data;
  await connectDB();

  let usuarioId: string;
  try {
    const usuario = await Usuario.create({
      nome,
      login,
      email,
      senhaHash: await bcrypt.hash(senha, 10),
      role: "paciente",
    });
    usuarioId = String(usuario._id);
  } catch (error) {
    if (erroDuplicado(error)) {
      const campo = error.keyPattern?.email ? "email" : "login";
      return {
        ok: false,
        erros: { [campo]: [campo === "email" ? "E-mail já cadastrado." : "Login já está em uso."] },
      };
    }
    throw error;
  }

  await criarSessao({ userId: usuarioId, role: "paciente" });
  redirect("/paciente");
}

export async function sair() {
  await encerrarSessao();
  redirect("/login");
}
