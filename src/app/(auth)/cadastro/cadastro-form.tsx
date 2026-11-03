"use client";

import { Loader2 } from "lucide-react";
import { cadastrar } from "@/actions/auth";
import { useFormAction } from "@/components/form/use-form-action";
import { MensagemForm } from "@/components/form/mensagem-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const CAMPOS = [
  { nome: "nome", rotulo: "Nome completo", autoComplete: "name" },
  { nome: "login", rotulo: "Login", autoComplete: "username", dica: "Letras minúsculas, números, ponto ou hífen." },
  { nome: "email", rotulo: "E-mail", autoComplete: "email", tipo: "email" },
  { nome: "senha", rotulo: "Senha", autoComplete: "new-password", tipo: "password", dica: "Mínimo de 8 caracteres, com letras e números." },
  { nome: "confirmarSenha", rotulo: "Confirme a senha", autoComplete: "new-password", tipo: "password" },
] as const;

export function CadastroForm() {
  const { estado, pendente, onSubmit, erro } = useFormAction(cadastrar);

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup className="gap-4">
        <MensagemForm estado={estado} />
        {CAMPOS.map((campo) => (
          <Field key={campo.nome} data-invalid={!!erro(campo.nome)}>
            <FieldLabel htmlFor={campo.nome}>{campo.rotulo}</FieldLabel>
            <Input
              id={campo.nome}
              name={campo.nome}
              type={"tipo" in campo ? campo.tipo : "text"}
              autoComplete={campo.autoComplete}
              required
              aria-invalid={!!erro(campo.nome)}
            />
            {erro(campo.nome) ? (
              <FieldError>{erro(campo.nome)}</FieldError>
            ) : (
              "dica" in campo && <FieldDescription>{campo.dica}</FieldDescription>
            )}
          </Field>
        ))}
        <Button type="submit" size="lg" className="mt-2 h-10" disabled={pendente}>
          {pendente && <Loader2 className="animate-spin" />}
          Criar conta
        </Button>
      </FieldGroup>
    </form>
  );
}
