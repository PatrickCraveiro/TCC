"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import type { EstadoForm } from "@/lib/form-state";

type Acao = (estado: EstadoForm, formData: FormData) => Promise<EstadoForm>;

/**
 * useActionState com submit via onSubmit, para os campos não serem limpos
 * quando a validação falha (o `<form action>` do React reseta o formulário).
 */
export function useFormAction(acao: Acao, opcoes: { aoConcluir?: (estado: EstadoForm) => void } = {}) {
  const [estado, despachar, pendente] = useActionState(acao, undefined);

  const aoConcluir = useRef(opcoes.aoConcluir);
  useEffect(() => {
    aoConcluir.current = opcoes.aoConcluir;
  });
  useEffect(() => {
    if (estado?.ok) aoConcluir.current?.(estado);
  }, [estado]);

  function onSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formData = new FormData(evento.currentTarget);
    startTransition(() => despachar(formData));
  }

  const erro = (campo: string) => estado?.erros?.[campo]?.[0];

  return { estado, pendente, onSubmit, erro };
}
