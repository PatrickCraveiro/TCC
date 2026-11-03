import "server-only";
import { cookies } from "next/headers";
import {
  COOKIE_SESSAO,
  DURACAO_SESSAO_MS,
  assinarSessao,
  lerSessao,
  type Sessao,
} from "@/lib/auth/token";

export async function criarSessao(sessao: Sessao) {
  const token = await assinarSessao(sessao);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_SESSAO, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + DURACAO_SESSAO_MS),
  });
}

export async function encerrarSessao() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_SESSAO);
}

export async function obterSessao() {
  const cookieStore = await cookies();
  return lerSessao(cookieStore.get(COOKIE_SESSAO)?.value);
}
