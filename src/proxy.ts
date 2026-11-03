import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESSAO, lerSessao } from "@/lib/auth/token";

// Checagem otimista (só o cookie) para redirecionar cedo. A autorização de
// verdade acontece na DAL (lib/auth/dal.ts), perto dos dados.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessao = await lerSessao(request.cookies.get(COOKIE_SESSAO)?.value);
  const para = (caminho: string) => NextResponse.redirect(new URL(caminho, request.nextUrl));

  if (pathname.startsWith("/admin")) {
    if (!sessao) return para("/login");
    if (sessao.role !== "admin") return para("/paciente");
  }

  if (pathname.startsWith("/paciente") && !sessao) return para("/login");

  if ((pathname === "/login" || pathname === "/cadastro") && sessao) {
    return para(sessao.role === "admin" ? "/admin" : "/paciente");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/paciente/:path*", "/login", "/cadastro"],
};
