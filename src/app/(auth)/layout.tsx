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
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(150deg,oklch(0.38_0.07_205),oklch(0.5_0.1_192))] p-10 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-white/8 blur-2xl"
        />
        <Logo claro />
        <div className="relative max-w-md">
          <h2 className="text-3xl leading-tight font-semibold text-balance">
            Atendimento sem fila começa no agendamento.
          </h2>
          <ul className="mt-8 space-y-4">
            {BENEFICIOS.map(({ icone: Icone, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-white/85">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/12 ring-1 ring-white/20">
                  <Icone className="size-4.5" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-white/60">Trabalho de Conclusão de Curso · Patrick Craveiro</p>
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
