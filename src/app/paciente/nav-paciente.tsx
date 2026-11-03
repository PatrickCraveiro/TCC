"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CalendarPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/paciente", rotulo: "Minhas consultas", icone: CalendarDays },
  { href: "/paciente/agendar", rotulo: "Agendar", icone: CalendarPlus },
];

export function NavPaciente() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-1">
      {LINKS.map(({ href, rotulo, icone: Icone }) => {
        const ativo = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={ativo ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              ativo && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icone className="size-4" />
            <span className="hidden sm:inline">{rotulo}</span>
          </Link>
        );
      })}
    </nav>
  );
}
