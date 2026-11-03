"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Os filtros das listagens vivem na URL (?q=...&clinica=...), então dá para
// compartilhar o link, recarregar a página ou usar o voltar do navegador.

function useParametroUrl(nome: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pendente, iniciar] = useTransition();

  function definir(valor: string | undefined) {
    const params = new URLSearchParams(searchParams);
    if (valor) params.set(nome, valor);
    else params.delete(nome);
    const query = params.toString();
    iniciar(() => router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false }));
  }

  return { valor: searchParams.get(nome) ?? "", definir, pendente };
}

export function BuscaUrl({ placeholder, className }: { placeholder: string; className?: string }) {
  const { valor, definir, pendente } = useParametroUrl("q");
  const [texto, setTexto] = useState(valor);
  const atraso = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(atraso.current), []);

  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      {pendente ? (
        <Loader2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      ) : (
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input
        type="search"
        value={texto}
        placeholder={placeholder}
        className="pl-9"
        onChange={(e) => {
          const novo = e.target.value;
          setTexto(novo);
          clearTimeout(atraso.current);
          atraso.current = setTimeout(() => definir(novo.trim() || undefined), 300);
        }}
      />
    </div>
  );
}

const TODOS = "__todos__";

export function SelectUrl({
  parametro,
  rotuloTodos,
  opcoes,
  className,
}: {
  parametro: string;
  rotuloTodos: string;
  opcoes: { valor: string; rotulo: string }[];
  className?: string;
}) {
  const { valor, definir } = useParametroUrl(parametro);
  return (
    <Select value={valor || TODOS} onValueChange={(v) => definir(v === TODOS ? undefined : v)}>
      <SelectTrigger className={cn("w-full sm:w-48", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={TODOS}>{rotuloTodos}</SelectItem>
        {opcoes.map((o) => (
          <SelectItem key={o.valor} value={o.valor}>
            {o.rotulo}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
