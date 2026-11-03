import type { NextRequest } from "next/server";
import { getUsuarioAtual } from "@/lib/auth/dal";
import { horariosDoDia } from "@/lib/data/consultas";

// GET /api/horarios?clinica=<id>&dia=yyyy-MM-dd
export async function GET(request: NextRequest) {
  const usuario = await getUsuarioAtual();
  if (!usuario) {
    return Response.json({ erro: "Não autenticado." }, { status: 401 });
  }

  const clinica = request.nextUrl.searchParams.get("clinica") ?? "";
  const dia = request.nextUrl.searchParams.get("dia") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dia)) {
    return Response.json({ erro: "Parâmetro 'dia' inválido." }, { status: 400 });
  }

  const horarios = await horariosDoDia(clinica, dia);
  return Response.json({ horarios }, { headers: { "Cache-Control": "no-store" } });
}
