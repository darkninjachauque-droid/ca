"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { UserNav } from "@/components/user-nav";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  tooltip={{ children: "Dashboard" }}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-1" />
            <UserNav />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold sm:text-xl">Dashboard</h1>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
          <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} HelioTech Devs &lt;/&gt;
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
