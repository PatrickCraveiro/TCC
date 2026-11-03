import * as z from "zod";

export type EstadoForm =
  | {
      ok: boolean;
      mensagem?: string;
      erros?: Record<string, string[] | undefined>;
    }
  | undefined;

export function errosDeValidacao(error: z.ZodError): EstadoForm {
  return {
    ok: false,
    mensagem: "Revise os campos destacados.",
    erros: z.flattenError(error).fieldErrors as Record<string, string[] | undefined>,
  };
}

/** Erro E11000 do MongoDB (violação de índice único). */
export function erroDuplicado(error: unknown): error is { code: 11000; keyPattern?: Record<string, number> } {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}
