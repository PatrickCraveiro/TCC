"use client";

import { Loader2 } from "lucide-react";
import { entrar } from "@/actions/auth";
import { useFormAction } from "@/components/form/use-form-action";
import { MensagemForm } from "@/components/form/mensagem-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const { estado, pendente, onSubmit, erro } = useFormAction(entrar);

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <MensagemForm estado={estado} />
        <Field data-invalid={!!erro("identificador")}>
          <FieldLabel htmlFor="identificador">Login ou e-mail</FieldLabel>
          <Input
            id="identificador"
            name="identificador"
            autoComplete="username"
            autoFocus
            required
            aria-invalid={!!erro("identificador")}
          />
          <FieldError>{erro("identificador")}</FieldError>
        </Field>
        <Field data-invalid={!!erro("senha")}>
          <FieldLabel htmlFor="senha">Senha</FieldLabel>
          <Input
            id="senha"
            name="senha"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={!!erro("senha")}
          />
          <FieldError>{erro("senha")}</FieldError>
        </Field>
        <Button type="submit" size="lg" className="h-10" disabled={pendente}>
          {pendente && <Loader2 className="animate-spin" />}
          Entrar
        </Button>
      </FieldGroup>
    </form>
  );
}
