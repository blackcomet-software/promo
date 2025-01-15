import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createClient } from "@/lib/supabase/server";

export default async function UserInfo() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={""} alt={user.data.user?.email} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.data.user?.aud}</span>
                <span className="truncate text-xs">{user.data.user?.email}</span>
              </div>
    </>
  )
}
