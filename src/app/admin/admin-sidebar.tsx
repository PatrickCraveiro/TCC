"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, CalendarDays, CalendarPlus, LayoutDashboard, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const SECOES = [
  { href: "/admin", rotulo: "Visão geral", icone: LayoutDashboard },
  { href: "/admin/consultas", rotulo: "Consultas", icone: CalendarDays },
  { href: "/admin/clinicas", rotulo: "Clínicas", icone: Building2 },
  { href: "/admin/funcionarios", rotulo: "Funcionários", icone: Users },
];

const ativa = (pathname: string, href: string) =>
  href === "/admin" ? pathname === href : pathname.startsWith(href);

export function AdminSidebar({ rodape }: { rodape: React.ReactNode }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center border-b px-4">
        <Logo href="/admin" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECOES.map(({ href, rotulo, icone: Icone }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={ativa(pathname, href)}>
                    <Link href={href} onClick={() => setOpenMobile(false)}>
                      <Icone /> {rotulo}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Atalhos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/paciente/agendar">
                    <CalendarPlus /> Agendar como paciente
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">{rodape}</SidebarFooter>
    </Sidebar>
  );
}

export function TituloSecao() {
  const pathname = usePathname();
  const secao = SECOES.find((s) => ativa(pathname, s.href));
  return <span className="text-sm font-medium">{secao?.rotulo ?? "Painel"}</span>;
}
