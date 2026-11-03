import * as z from "zod";
import { CARGOS, ESPECIALIDADE_IDS, HORARIOS, SINTOMAS } from "@/lib/constants";
import { cnpjValido, cpfValido, normalizarCNPJ, somenteDigitos } from "@/lib/format";

const texto = (min: number, campo: string) =>
  z.string().trim().min(min, `${campo} deve ter pelo menos ${min} caracteres.`).max(120);

export const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Identificador inválido.");

export const loginSchema = z.object({
  identificador: z.string().trim().min(1, "Informe seu login ou e-mail."),
  senha: z.string().min(1, "Informe sua senha."),
});

export const cadastroSchema = z
  .object({
    nome: texto(3, "Nome"),
    login: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[a-z0-9._-]{3,30}$/, "Use de 3 a 30 letras, números, ponto, hífen ou _."),
    email: z.email("Informe um e-mail válido.").trim().toLowerCase(),
    senha: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .max(72, "A senha deve ter no máximo 72 caracteres.")
      .regex(/[a-zA-Z]/, "A senha deve ter pelo menos uma letra.")
      .regex(/[0-9]/, "A senha deve ter pelo menos um número."),
    confirmarSenha: z.string(),
  })
  .refine((d) => d.senha === d.confirmarSenha, {
    path: ["confirmarSenha"],
    error: "As senhas não conferem.",
  });

export const clinicaSchema = z.object({
  nome: texto(2, "Nome"),
  cnpj: z
    .string()
    .refine(cnpjValido, "CNPJ inválido.")
    .transform(normalizarCNPJ),
  cidade: texto(2, "Cidade"),
  bairro: texto(2, "Bairro"),
  cep: z
    .string()
    .transform(somenteDigitos)
    .refine((v) => v.length === 8, "CEP deve ter 8 dígitos."),
});

export const funcionarioSchema = z.object({
  nome: texto(3, "Nome"),
  cpf: z
    .string()
    .refine(cpfValido, "CPF inválido.")
    .transform(somenteDigitos),
  email: z.email("Informe um e-mail válido.").trim().toLowerCase(),
  cargo: z.enum(CARGOS, "Selecione um cargo."),
  clinicaId: z.string().min(1, "Selecione a clínica.").pipe(objectId),
  dataContratacao: z.iso.date("Informe a data de contratação."),
});

export const agendamentoSchema = z.object({
  clinicaId: objectId,
  especialidade: z.enum(ESPECIALIDADE_IDS, "Selecione uma especialidade."),
  sintomas: z.array(z.enum(SINTOMAS)).max(SINTOMAS.length),
  observacoes: z.string().trim().max(500, "Máximo de 500 caracteres.").optional(),
  dia: z.iso.date("Selecione uma data."),
  hora: z.enum(HORARIOS, "Selecione um horário."),
});
export type AgendamentoInput = z.input<typeof agendamentoSchema>;
