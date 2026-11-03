import { Badge } from "@/components/ui/badge";
import type { StatusConsulta } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ESTILOS: Record<StatusConsulta | "pendente", { rotulo: string; classe: string }> = {
  agendada: { rotulo: "Agendada", classe: "bg-primary/10 text-primary" },
  realizada: { rotulo: "Realizada", classe: "bg-success/12 text-success" },
  cancelada: { rotulo: "Cancelada", classe: "bg-muted text-muted-foreground" },
  pendente: { rotulo: "Aguardando baixa", classe: "bg-warning/15 text-[oklch(0.5_0.12_65)]" },
};

/** `passou` marca consultas ainda "agendadas" cuja data já ficou para trás. */
export function StatusBadge({ status, passou = false }: { status: StatusConsulta; passou?: boolean }) {
  const chave = status === "agendada" && passou ? "pendente" : status;
  const { rotulo, classe } = ESTILOS[chave];
  return (
    <Badge variant="secondary" className={cn("border-0", classe)}>
      {rotulo}
    </Badge>
  );
}
