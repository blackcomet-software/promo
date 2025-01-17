import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, CirclePlus, Kanban, LayoutDashboard, Users } from "lucide-react";
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
                <SidebarMenuButton>
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
                <DropdownMenuItem>
                  <CirclePlus />
                  New Project
                </DropdownMenuItem>
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
                <Link href={`board`}>
                  <Kanban />
                  <span>Board</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: userData.data?.name ?? "Unknown",
            avatar: "",
            email: user.data.user?.email ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
