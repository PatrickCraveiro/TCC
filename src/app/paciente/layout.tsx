import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { UserMenu, UserMenuSkeleton } from "@/components/user-menu";
import { NavPaciente } from "./nav-paciente";

export default function PacienteLayout({ children }: LayoutProps<"/paciente">) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:gap-8 sm:px-6">
          <Logo href="/paciente" />
          <NavPaciente />
          <div className="ml-auto">
            <Suspense fallback={<UserMenuSkeleton />}>
              <UserMenu />
            </Suspense>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
