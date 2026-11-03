import { CalendarCheck2, ClipboardList, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

const BENEFICIOS = [
  { icone: CalendarCheck2, texto: "Horários livres em tempo real, em várias clínicas" },
  { icone: ClipboardList, texto: "Pré-triagem online: o médico já sabe o que você sente" },
  { icone: ShieldCheck, texto: "Seus dados protegidos e senha criptografada" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 text-paper lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(36rem_28rem_at_100%_100%,color-mix(in_oklch,var(--accent-500)_34%,transparent),transparent)]"
        />
        <Logo claro className="relative" />
        <div className="relative max-w-md">
          <h2 className="text-3xl leading-tight font-semibold text-balance">
            Atendimento sem fila começa no agendamento.
          </h2>
          <ul className="mt-8 space-y-4">
            {BENEFICIOS.map(({ icone: Icone, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-paper/80">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-paper/6 text-(--accent-400) ring-1 ring-paper/12">
                  <Icone className="size-4.5" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-paper/60">Trabalho de Conclusão de Curso · Patrick Craveiro</p>
      </aside>

      <main className="flex flex-col px-6 py-10 sm:px-10">
        <Logo className="lg:hidden" />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </main>
    </div>
  );
}
