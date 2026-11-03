"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CalendarX2, Loader2 } from "lucide-react";
import { cancelarConsulta } from "@/actions/consultas";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function CancelarConsulta({
  id,
  descricao,
  compacto = false,
}: {
  id: string;
  descricao: string;
  compacto?: boolean;
}) {
  const [pendente, iniciar] = useTransition();

  function confirmar() {
    iniciar(async () => {
      const resultado = await cancelarConsulta(id);
      if (resultado?.ok) toast.success(resultado.mensagem);
      else toast.error(resultado?.mensagem ?? "Não foi possível cancelar.");
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={compacto ? "ghost" : "outline"} size="sm" disabled={pendente}>
          {pendente ? <Loader2 className="animate-spin" /> : <CalendarX2 />}
          Cancelar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancelar esta consulta?</AlertDialogTitle>
          <AlertDialogDescription>{descricao}. O horário volta a ficar disponível.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Manter consulta</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={confirmar}>
            Cancelar consulta
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
