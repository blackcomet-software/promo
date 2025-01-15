import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { NavUser } from "./nav-user"
import { createClient } from "@/lib/supabase/server"
 
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export async function AppSidebar() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const projects = await supabase.from("project_member").select(`
  project ( id, name )
`);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Project
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {projects.data.map(x => <DropdownMenuItem key={x.project.id}><span>{x.project.name}</span></DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{
          name: user.data.user?.aud,
          avatar: user.data.user?.user_metadata,
          email: user.data.user?.email
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
