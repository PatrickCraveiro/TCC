"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CircleCheck, Loader2 } from "lucide-react";
import { marcarComoRealizada } from "@/actions/consultas";
import { Button } from "@/components/ui/button";

export function MarcarRealizada({ id }: { id: string }) {
  const [pendente, iniciar] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pendente}
      onClick={() =>
        iniciar(async () => {
          const resultado = await marcarComoRealizada(id);
          if (resultado?.ok) toast.success(resultado.mensagem);
          else toast.error(resultado?.mensagem ?? "Não foi possível atualizar.");
        })
      }
    >
      {pendente ? <Loader2 className="animate-spin" /> : <CircleCheck />}
      Realizada
    </Button>
  );
}
