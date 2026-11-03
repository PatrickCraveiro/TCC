import type { Metadata } from "next";
import Link from "next/link";
import { CadastroForm } from "./cadastro-form";

export const metadata: Metadata = { title: "Criar conta" };

export default function CadastroPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Leva menos de um minuto. Depois é só escolher a clínica e o horário.
        </p>
      </div>
      <CadastroForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </>
  );
}
