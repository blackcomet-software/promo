import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const params = await props.params
  return (
    <SidebarProvider>
      <AppSidebar selectedProjectId={params.id} />
      <main className="flex-1">{props.children}</main>
    </SidebarProvider>
  );
}
