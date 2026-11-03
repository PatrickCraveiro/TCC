import Link from "next/link";
import { CalendarDays, CalendarPlus, LayoutDashboard, LogOut } from "lucide-react";
import { getUsuarioAtual } from "@/lib/auth/dal";
import { sair } from "@/actions/auth";
import { iniciais } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export async function UserMenu({
  mostrarNome = false,
  className,
  lado = "bottom",
}: {
  mostrarNome?: boolean;
  className?: string;
  lado?: "top" | "bottom";
}) {
  const usuario = await getUsuarioAtual();
  if (!usuario) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("h-auto gap-2.5 px-1.5 py-1", className)}>
          <Avatar className="size-8">
            <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
              {iniciais(usuario.nome)}
            </AvatarFallback>
          </Avatar>
          {mostrarNome && (
            <span className="grid min-w-0 text-left text-sm leading-tight">
              <span className="truncate font-medium">{usuario.nome}</span>
              <span className="truncate text-xs text-muted-foreground">{usuario.email}</span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side={lado} className="w-60">
        <DropdownMenuLabel className="grid font-normal">
          <span className="truncate font-medium">{usuario.nome}</span>
          <span className="truncate text-xs text-muted-foreground">{usuario.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {usuario.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <LayoutDashboard /> Painel administrativo
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/paciente">
              <CalendarDays /> Minhas consultas
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/paciente/agendar">
              <CalendarPlus /> Agendar consulta
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={sair}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <LogOut /> Sair
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UserMenuSkeleton() {
  return <Skeleton className="size-8 rounded-full" />;
}
