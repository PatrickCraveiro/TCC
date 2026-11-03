import { Suspense } from "react";
import { UserMenu, UserMenuSkeleton } from "@/components/user-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar, TituloSecao } from "./admin-sidebar";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <SidebarProvider>
      <AdminSidebar
        rodape={
          <Suspense fallback={<UserMenuSkeleton />}>
            <UserMenu mostrarNome lado="top" className="w-full justify-start" />
          </Suspense>
        }
      />
      <SidebarInset className="bg-muted/40">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5!" />
          <TituloSecao />
        </header>
        <div className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
