import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export function Campo({
  nome,
  rotulo,
  erro,
  children,
}: {
  nome: string;
  rotulo: string;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <Field data-invalid={!!erro}>
      <FieldLabel htmlFor={nome}>{rotulo}</FieldLabel>
      {children}
      <FieldError>{erro}</FieldError>
    </Field>
  );
}
