import { SignJWT, jwtVerify } from "jose";
import { ROLES, type Role } from "@/lib/constants";

// Sem `server-only` aqui porque este módulo também é usado pelo proxy.ts.

export const COOKIE_SESSAO = "medquery_sessao";
export const DURACAO_SESSAO_MS = 7 * 24 * 60 * 60 * 1000;

export type Sessao = { userId: string; role: Role };

function chave() {
  const segredo = process.env.SESSION_SECRET;
  if (!segredo || segredo.length < 32) {
    throw new Error("SESSION_SECRET ausente ou com menos de 32 caracteres.");
  }
  return new TextEncoder().encode(segredo);
}

export async function assinarSessao(sessao: Sessao) {
  return new SignJWT(sessao)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + DURACAO_SESSAO_MS))
    .sign(chave());
}

export async function lerSessao(token: string | undefined): Promise<Sessao | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, chave(), { algorithms: ["HS256"] });
    if (typeof payload.userId !== "string" || !ROLES.includes(payload.role as Role)) {
      return null;
    }
    return { userId: payload.userId, role: payload.role as Role };
  } catch {
    return null;
  }
}
