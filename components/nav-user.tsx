"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,

  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOut } from "@/lib/supabase/sign-out"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { toast } from "sonner"

export function NavUser({
  user,

}: {
  user: {
    id: string,
    name: string
    email: string
    avatar: string
  }
}) {

  const { isMobile } = useSidebar()
  const queryNotificationAmount = useQuery({
    queryKey: ["notification_amount"],
    queryFn: async () => {
      const supabase = createClient();
      const res = await supabase.from("notification").select("*", {count: "exact"}).eq("target_user_id", user.id)
      console.log(res)
      return res.count
    }
  })

  const queryClient = useQueryClient()
  const supabase = createClient();
  useEffect(() => {
    supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes", 
        {
          event: 'INSERT', 
          schema: "public", 
          table: "notification"
        }, 
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["notification_amount"]})
          toast(payload.new.message)
          console.log(payload)
        }
      )
    .subscribe()
  }, [supabase, queryClient])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"

            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">

              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>

                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
           
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <Link href="/notifications">
              <DropdownMenuItem>
                <Bell />
                Notifications
                <div className="ml-auto bg-red-500 size-5 rounded-full flex items-center justify-center"><p className="text-white">{queryNotificationAmount.data}</p></div> 
              </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

