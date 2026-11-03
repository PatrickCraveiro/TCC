import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { Usuario } from "@/lib/models/usuario";
import { obterSessao } from "@/lib/auth/session";
import type { Role } from "@/lib/constants";

export type UsuarioAtual = {
  id: string;
  nome: string;
  email: string;
  login: string;
  role: Role;
};

// O papel (role) vem do banco, não do token: rebaixar um admin vale na hora.
export const getUsuarioAtual = cache(async (): Promise<UsuarioAtual | null> => {
  const sessao = await obterSessao();
  if (!sessao || !isValidObjectId(sessao.userId)) return null;

  await connectDB();
  const usuario = await Usuario.findById(sessao.userId).lean();
  if (!usuario) return null;

  return {
    id: String(usuario._id),
    nome: usuario.nome,
    email: usuario.email,
    login: usuario.login,
    role: usuario.role,
  };
});

export async function exigirUsuario() {
  const usuario = await getUsuarioAtual();
  if (!usuario) redirect("/login");
  return usuario;
}

export async function exigirAdmin() {
  const usuario = await exigirUsuario();
  if (usuario.role !== "admin") redirect("/paciente");
  return usuario;
}
