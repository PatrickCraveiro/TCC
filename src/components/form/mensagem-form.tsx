import { CircleAlert } from "lucide-react";
import type { EstadoForm } from "@/lib/form-state";

/** Mensagem geral de erro do formulário (erros por campo aparecem em cada campo). */
export function MensagemForm({ estado }: { estado: EstadoForm }) {
  if (!estado || estado.ok || !estado.mensagem) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" />
      <span>{estado.mensagem}</span>
    </div>
  );
}
