import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <SidebarProvider>
      <AppSidebar selectedProjectId={params.id} />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
