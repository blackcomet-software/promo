import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChartNetwork, ChevronDown, CirclePlus, Columns3, FileText, Kanban, LayoutDashboard, Map, Users } from "lucide-react";
import { NavUser } from "./nav-user";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export async function AppSidebar(props: { selectedProjectId: string }) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const userData = await supabase
    .from("user")
    .select()
    .eq("id", user.data.user!.id)
    .single();

  const projects = await supabase.from("project_member").select(`
  project ( id, name )
`);

  const selectedProject = projects.data?.find(
    (x) => x.project.id === props.selectedProjectId,
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="font-bold">
                  {selectedProject?.project.name}
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {projects.data?.map((x) => (
                  <Link key={x.project.id} href={`/project/${x.project.id}`}>
                    <DropdownMenuItem>
                      <span>{x.project.name}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                <Link href="/new-project">
                <DropdownMenuItem>
                  <CirclePlus />
                  New Project
                </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`dashboard`}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                Application
                </SidebarMenuButton>
                </SidebarMenuItem> 
              <SidebarMenuSub>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={`dashboard`}>
                      <ChartNetwork />
                      <span>Infrastructure</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenuSub>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Planning</SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuSub>
                   <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`roadmap`}>
                  <Map />
                  <span>Roadmap</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`board`}>
                  <Columns3 />
                  <span>Board</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
              </SidebarMenuSub>
            </SidebarMenu>


           
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`members`}>
                  <Users />
                  <span>Members</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={`documentation`}>
                  <FileText />
                  <span>Documentation</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            id: userData.data!.id,
            name: userData.data?.name ?? "Unknown",
            avatar: "",
            email: user.data.user?.email ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
